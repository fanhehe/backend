const Koa = require('koa');
const path = require('path');
const json = require('koa-json');
const logger = require('koa-logger');
const convert = require('koa-convert');
const session = require('koa-session');
const onError = require('koa-onerror');

const router = require('koa-router')();
const bodyParser = require('koa-bodyparser')();

import user from './routes/user';
const config = require('./config');

const app = new Koa();

// middlewares
app.use(convert(bodyParser));
app.use(convert(json()));
app.use(convert(logger()));
app.use(convert(session(config.session, app)));

app.use(async (ctx, next) => {
    const start:any = new Date();
    await next();
    const end:any = new Date();
    const ms = end - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});
app.use(async (ctx, next) => {
    let ensureCROS = false;
    const { origin, host } = ctx.headers;
    const url = origin || host;
    const whiteList = config.whiteList;
    ensureCROS = whiteList.some( item => item.indexOf(url) != -1);

    if (!ensureCROS) {
        console.log('no permision for cros');
    } else {
        ctx.set("Access-Control-Allow-Origin", origin);
        ctx.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, Cookie');
        ctx.set("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
        ctx.set('Access-Control-Allow-Credentials', 'true');
        ctx.set("X-Powered-By",' 3.2.1')
        ctx.set("Content-Type", "application/json;charset=utf-8");
        next();
    }
});

router.use('/user', user.routes(), user.allowedMethods());
app.use(router.routes(), router.allowedMethods());

app.on('error', function (err, ctx) {
    console.error(err, ctx);
});
export default app;
