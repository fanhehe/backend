const path = require('path');
const router = require('koa-router')();
const DBSequelize = require('../db/mysql').Main;
const db = require('../models/mysql')(DBSequelize,'main');

import resConfig from '../utils/ResponseFormatter';

router.get('/', (ctx, next) => {
    console.log('blog, over');
    ctx.body = {a: 1};
});
router.get('/info/:id', (ctx, next) => {
    const id = ctx.params.id;
    console.log(db.TUser.find, '---s-----s------s-----');
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
router.get('/')
export default router;