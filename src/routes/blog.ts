const path = require('path');
const router = require('koa-router')();
const DBSequelize = require('../db/mysql').Main;
const db = require('../models/mysql')(DBSequelize,'main');

import resConfig from '../utils/ResponseFormatter';

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
		ctx.body = resConfig(ctx, 'ok', '');
	});
	ctx.body = data;
});
router.get('/list', (ctx, next) => {
});

export default router;
