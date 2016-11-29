const router = require('koa-router')();

router.get('/', function (ctx, next) {
  const userId = ctx.session.user? ctx.session.user.id : '';
  let resData = {};
  if (userId) {
    ctx.body = {
      username: '1',
      data: {}
    };
  } else {
    ctx.body = "user not login";
  }
});

export default router;