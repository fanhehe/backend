const router = require('koa-router')();
const DBSequelize = require('../db/mysql').Main;
const db = require('../db/mysql/models/')(DBSequelize, 'Main');

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
	db.TUser.create({data});
	ctx.body = {success: 'success'};
});

export default router;