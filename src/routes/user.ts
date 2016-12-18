const router = require('koa-router')();
import { Main } from '../db/mysql';

router.get('/', function (ctx, next) {
	const userId = ctx.session.user? ctx.session.user.id : '';
	let resData = {};
	if (userId) {
		ctx.body = {
			username: '1',
			data: {},
		};
	} else {
		ctx.body = "user not login";
	}
});

router.post('/register', async (ctx, next) => {
	const data = ctx.request.body;
	const result = await Main.TUser.find({where: {id: 1}}).then(data=> data.dataValues);
	console.log(result, 'success');
	ctx.body = result;
});

export default router;