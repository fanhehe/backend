const router = require('koa-router')();
import { Main } from '../db/mysql';

router.get('/', function (ctx, next) {
	console.log(11111);
	const userId = ctx.session.user? ctx.session.user.id : '';
	let resData = {};
	if (userId) {
		ctx.body = {
			username: '1',
			data: {},
		};
	} else {
		ctx.body = "user not loginss";
	}
});

router.post('/register', async (ctx, next) => {
	const data: any = ctx.request.body;
	const result = await registerWithEmail(data);
	ctx.body = result;
});

router.post('/test', async (ctx, next) => {
	console.log('start');
	const result = await Main.TUser.find({where: {id: 1}}).then(data => data.dataValues);
	console.log(result);
	ctx.body = result;
	console.log('end');
});
export default router;

const registerWithEmail = async data => {
	console.log(1);
	const { email, nickname } = data;

	const result = await new Promise(resolve => {
		console.log(2);
		Main.TUser.findOrCreate({
			where: {
				email,
				nickname,
			},
			default: {
				...data,
			}
		}).then( data => {
			console.log(3);
			resolve(data);
		});
		console.log(4);
	});

	console.log(5);
	return result;
}
