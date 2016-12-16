const path = require('path');
const router = require('koa-router')();
import { Main as db} from '../db/mysql';

// 测试 ORM Mysql 是否连接成功。
// db.TUser.find({ where: { id: 1, }}).then(function (data){ console.log(data.dataValues); });

router.get('/', (ctx, next) => {
	return new Promise(function (resolve, reject) {
		setTimeout(function(){
			ctx.body = {a: 1, b:2};
			resolve();
		}, 300);
	});
});

router.get('/info/:id', async (ctx, next) => {
	const id = ctx.params.id;
	const data = await db.TUser.find({
		where: {
			id,
		},
	}).then(function (user) {
		const data = user ? user.dataValues: '';
		const status = user ? 'ok': 'assets_no_exist';
		return user.dataValues;
	}).catch(function (error) {
		console.log('err', error);
	});
	ctx.body = data;
});
router.get('/list', (ctx, next) => {
});

export default router;
