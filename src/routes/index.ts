import user from './user';
import article from './article';


const router = require('koa-router')();

router.prefix('/api');

// user 表
router.use('', user.routes(), user.allowedMethods());
// article 表 
router.use('', article.routes(), article.allowedMethods());

export default router;