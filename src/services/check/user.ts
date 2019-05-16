/**
 * check 中间件函数文件， 涉及所有关于user表的检测方法，均为纯函数。
 * 一般规定最后一个参数为待测数据，而之前的参数为附加配置的参数。
 * 禁止从外部获取数据。
 */

import * as types from '../../utils/resConfig';

// 用户信息筛选器
export const Attr = {
	default: ['id', 'username', 'nickname', 'preview', 'gender', 'email', 'telephone'],
	master: ['password'],
};

/**
 * [checkEmail 检查邮箱格式]
 * @param {[type]} data [description]
 */
export function checkEmail (data) {
	
	const { email } = data;
	const regexp    = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/;

	if (!regexp.test(email)) throw { status: types.C4_EMAIL_FORMAT };

	return data;
};

/**
 * [checkNickname 昵称格式检查]
 * @param {[object]} data [包含所需要检查的数据的对象]
 * @returns 返回原数据 或可修改 为之后的中间价使用
 */
export function checkNickname (data) {
	const { nickname } = data;
	const regexp       = /^([a-zA-Z]|[a-zA-Z0-9]|[\u4e00-\u9fa5]|[\.\_\-\'\"\?\+\=\@]){1,16}$/;

	if (!regexp.test(nickname)) throw { status: types.C4_NICKNAME_FORMAT }; 

	return data;
};
export function checkUsername (data) {
	const { username } = data;
	const regexp       = /^([a-zA-Z]|[0-9]){5,12}$/;

	if (!regexp.test(username)) throw { status: types.C4_USERNAME_FORMAT };
	
	return data;
};
/**
 * [checkPassword 密码格式检查]
 * @param {[object]} data [description]
 */
export function checkPassword (data) {
	const { password } = data;
	const regexp       = /^([a-zA-Z]|[a-zA-Z0-9]|[\.\_\-\'\"\?\+\=\@]){6,16}$/;
	if (!regexp.test(password)) throw { status: types.C4_PASSWORD_FORMAT };
	return data;
}

/**
 * [checkHasLogin 检测用户是否已经登录]
 * @param {[type]} data [description]
 */
export function shouldNotLogin (data) {
	const { session } = data;
	if (session && session.id) throw { status: types.C4_USER_SHOULD_NOT_LOGIN };
	return data;
}
/**
 * [shouldLogin description]
 * @param {[type]} data [description]
 */
export function shouldLogin (data) {
	const { session } = data;
	if (!(session && session.id)) throw { status: types.C4_USER_SHOULD_LOGIN };
	return data;
}
/**
 * [checkUserInfo description]
 * @param {[type]} data    [description]
 * @param {[type]} options [description]
 */
export async function checkUserInfo (options: { table: any }, data) {
	const Table = options.table;
	const { username, email, password } = data;
	const where:{ password: string; email?: string; username?: string;} = { password };

	if (email) where.email = email;
	if (username) where.username = username;

	// attributes
	const attributes = [...Attr.default, ...Attr.master];
	const result = await Table.find({ where, attributes })
							.then( data => data ? data.dataValues : {})
							.catch( error => { console.log(error); return {} });

	if (!result.id) throw { status: types.C4_ACCOUNT_NOT_EXIST };
	if (result.password !== password) throw { status: types.C4_PASSWORD_ERROR };
	// 去掉密码信息
	delete result.password;
	// 返回信息
	return { ...data, data: { ...result } };
}
/**
 * [singleOnly [单项] 检测数据库数据唯一性]
 * @param {[object]}    options       { table: 表的orm对象, name: 所查数据的键, error: 存在重复时抛出的异常 }
 * @param {[object]}    data          所需要检测的数据。
 * @returns 原数据
 */
export const singleOnly = async (options: { table: any; name?: string; error?: string; }, data?) => {
	
	const Table = options.table;
	const { name, error } = options;
	// 初始化
	const where = { name: data[name] };
	const result = await Table.find({ where, attributes: ['id'] })
							.then(data   => data? data.dataValues.id: data)
							.catch(error => { console.log(error); return  null });

	if (result) throw { status: error };

	return data;
};

/**
 * [multionly [多项] 检测数据库数据唯一性]
 * @param {object} options       { table: 表的orm对象, where: 检测项及重复时抛出的异常, condition: 多项之间的关系, func: 'some'| 'every' }
 * @param {object} data          待测数据
 * @returns                      原始数据
 */
export const multiOnly = async (options: { table: any; where: any[]; condition?: string; }, data?) => {
	const Table = options.table;
	let { condition, where: params } = options;

	// 初始化
	condition = condition || '$and';

	const names = params.map(item => item.name);
	const errors = params.reduce((result, item) => { result[item.name] = item.error; return result; }, {});

	const attributes = ['id', ...names];
	const where = { [condition]: params.map(({name}) => ({ [name]: data[name] })) };

	const result = await Table.find({ where, attributes })
							.then(result => result? result.dataValues: {})
							.then(checkDuplicate)
							.catch(error => { console.log(error); return error });

	if (result && result.error) throw result;

	return data;

	function checkDuplicate (result) {
		let error = false, key ='';
		names.every(name => {
			if (result[name] === data[name]) {
				key = name;
				error = true;
				return false;
			}
			return true;
		});
		return error? { error: true, status: errors[key] }: result;
	}
}
