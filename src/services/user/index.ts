import Check from '../check';
import * as checks from '../check/user';
// import { checkEmail, checkNickname, singleOnly, multiOnly, checkPassword, shouldLogin, shouldNotLogin, checkUserInfo } from '../check/user';

import { Main } from '../../db/mysql';
import * as types from '../../utils/resConfig';

import { user as methods } from '../../common/constants/request';

export default {
	/**
	 * @param  {} payload
	 * @returns
	 */
	 async [ methods.REGISTER_WITH_EMAIL.name ] (ctx, data) {
	 	let result: any = {};
	 	const check = new Check(data);

	 	// 处理状态 
	 	const { C2_REGISTER_SUCCESS, C5_REGISTER_ERROR, C4_NICKNAME_FORMAT } = types;
	 	// 中间件
	 	const { multiOnly, checkEmail, checkNickname } = checks;
	 	// 数据检查中间件数据
	 	const condition = '$or';
	 	const checklist = ['nickname', 'email'];
	 	const where = checklist.map(item => ({ name: item, error: types[`C4_${item.toUpperCase()}_DUPLICATE`] }));
	 	//邮箱，昵唯一性检测中间件。
	 	const emailOrNicknameOnly = multiOnly.bind(null, { table: Main.TUser, where, condition });
	 	// 检测结果
	 	const checkResult = await check.with(checkEmail).with(checkNickname).with(emailOrNicknameOnly).end();
	 	// 没有错误
	 	if (!checkResult.error) {
	 		// 创建新账号
	 		result = await Main.TUser.create(data).then((data) => {
	 			const status = data.id? C2_REGISTER_SUCCESS: C5_REGISTER_ERROR;
	 			return { status, data };
	 		}).catch(error => error);
	 		// 写入session
	 	}

	 	return { ...checkResult, ...result };
	 },
	/**
	 * [ctx description]
	 * @type {[type]}
	 */
	 async [ methods.REGISTER_WITH_USERNAME.name ] (ctx, data) {
	 	let result: any = {};
	 	const check = new Check(data);

	 	// 处理状态 
	 	const { C2_REGISTER_SUCCESS, C5_REGISTER_ERROR, C4_NICKNAME_FORMAT } = types;
	 	// 中间件
	 	const { multiOnly, checkUsername, checkNickname } = checks;
	 	// 数据检查中间件数据
	 	const condition = '$or';
	 	const checklist = ['nickname', 'username'];
	 	const where = checklist.map(item => ({ name: item, error: types[`C4_${item.toUpperCase()}_DUPLICATE`] }));
	 	//邮箱，昵唯一性检测中间件。
	 	const usernameOrNicknameOnly = multiOnly.bind(null, { table: Main.TUser, where, condition });
	 	// 检测结果
	 	const checkResult = await check.with(checkUsername).with(checkNickname).with(usernameOrNicknameOnly).end();
	 	// 没有错误
	 	if (!checkResult.error) {
	 		// 创建新账号
	 		result = await Main.TUser.create(data).then(data => {
	 			const status = data.id? C2_REGISTER_SUCCESS: C5_REGISTER_ERROR;
	 			return { status, data };
	 		}).catch(error => error);
	 		// 写入session
	 		const { id, nickname, username } = result.data;
	 		ctx.session = { id, nickname, username };
	 	}

	 	return { ...checkResult, ...result };
	 },
	/**
	 * [ctx description]
	 * @type {[type]}
	 */
	 async [ methods.LOGIN_WITH_EMAIL.name ] (ctx, data: { email: string; password: string; session: any}) {

	 	const result: any  = {};
	 	const { email, password, session } = data;
	 	const check  = new Check ({ email, password, session });

	 	// 状态
	 	const { C2_LOGIN_SUCCESS } = types;
	 	// 中间件
	 	const { checkUserInfo, shouldNotLogin, checkEmail, checkPassword } = checks;
	 	// 用户是否已登录中间件 
	 	const checkUser = checkUserInfo.bind(null, { table: Main.TUser });
	 	const checkResult = await check.with(shouldNotLogin).with(checkEmail).with(checkPassword).with(checkUser).end();

	 	// 没有错误
	 	if ( !checkResult.error ) {
	 		result.status = C2_LOGIN_SUCCESS;
	 		const { id, username, nickname } = checkResult.data;
	 		ctx.session = { id, email, nickname, username };
	 	}

	 	return { ...checkResult, ...result };
	 },
	 /**
	  * [ctx description]
	  * @type {[type]}
	  */
	 async [ methods.LOGIN_WITH_USERNAME.name ] (ctx, data: { username: string; password: string; session: any }) {
	 	const result: any  = {};
	 	const check  = new Check (data);
	 	// 中间件
	 	let { checkUserInfo } = checks;
	 	const { shouldNotLogin, checkUsername, checkPassword } = checks;
	 	// 配置中间件
	 	checkUserInfo = checkUserInfo.bind(null, { table: Main.TUser });

	 	const checkResult = await check.with(shouldNotLogin).with(checkUsername).with(checkPassword).with(checkUserInfo).end();
	 	// 没有错误
	 	if ( !checkResult.error ) {
	 		result.status = types.C2_LOGIN_SUCCESS;
	 		const { id, username, nickname } = checkResult.data;
	 		ctx.session = { id, username, nickname };
	 	}
	 	return { ...checkResult, ...result };
	 },
	/**
	 * [ctx description]
	 * @type {[type]}
	 */
	 async [ methods.LOGOUT.name ] (ctx, data: any) {
	 	const { session } = ctx;
	 	const check = new Check({ session });
	 	// 成功的状态
	 	const status = types.C2_LOGOUT_SUCCESS;
	 	// 中间件
	 	const { shouldLogin } = checks;
	 	const checkResult = await check.with(shouldLogin).end();
	 	// 注销
	 	if (!checkResult.error) ctx.session = null;
	 	return { status, ...checkResult };
	 },
	/**
	 * [ctx description]
	 * @type {[type]}
	 */
	async [ methods.GET_USER_INFO_BY_ID.name ] (ctx, data) {
	 	const { session, id } = data;
	 	const check = new Check({ session, id });
	 },
	 /**
	  * [ctx description]
	  * @type {[type]}
	  */
	async [ methods.GET_USER_INFO_BY_USERNAME.name ] (ctx, data) {
		let result: any = {};
		const check = new Check(data);
		const { shouldLogin } = checks;
		// 检测
		const checkResult = await check.with(shouldLogin).end();

		if (!checkResult.error) {
			const where = { username: data.session.username };
			result = await Main.TUser.find({ where }).then( data => data.dataValues ).catch( error => error);
		}
		return { status: 200, ...checkResult, data: result? result: null };
	},
};

	interface Return {
		error?: boolean;
		status?: string | number;
		data?: any;
	}