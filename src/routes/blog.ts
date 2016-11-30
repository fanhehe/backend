const path = require('path');
const router = require('koa-router')();
const DBSequelize = require('../db/mysql').Main;
const db = require('../models/mysql')(DBSequelize,'main');

import resConfig from '../utils/ResponseFormatter';

router.get('/', (ctx, next) => {
    ctx.body = {a: 'abcacs'};
});

router.get('/info/:id', (ctx, next) => {
    const id = ctx.params.id;

    db.TUser.find({
        where: {
            id,
        }
    }).then(function (user) {
         if(user) {
            ctx.body(resConfig(ctx.request,'ok',user));
        } else {
            ctx.body(resConfig(ctx.request,'assets_no_exist',''))
        }
    }).catch(function (error) {
        console.log(error);
    });
});
router.get('/list', (ctx, next) => {
});

export default router;