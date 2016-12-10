const path = require('path');
const router = require('koa-router')();
const DBSequelize = require('../db/mysql').Main;
const db = require('../models/mysql')(DBSequelize,'main');

import resConfig from '../utils/ResponseFormatter';

router.get('/', (ctx, next) => {
    ctx.body = {a: 'abcacs'};
});

router.get('/info/:id', async (ctx, next) => {
    const id = ctx.params.id;
    const data = await db.TUser.find({
        where: {
            id,
        }
    }).then(function (user) {
        const data = user ? user.dataValues: '';
        const status = user ? 'ok': 'assets_no_exist';
        ctx.body = user.dataValues;
        return user.dataValues;
    }).catch(function (error) {
        console.log(error);
        ctx.body = resConfig(ctx, 'ok', 'sss');
    });
    ctx.body = {a:2};
});
router.get('/list', (ctx, next) => {
});

export default router;