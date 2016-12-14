const router = require('koa-router')();

router.get('/', function (ctx, next) {
	const userId = ctx.session.user? ctx.session.user.id : '';
	console.log(1);
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
	ctx.body = {
		status: 'successs',
	};
});

export default router;