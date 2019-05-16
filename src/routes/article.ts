const router = require('koa-router')();
import resConfig from '../utils/resConfig';

import Article from '../services/article/';
import { article } from '../common/constants/request';

router.get(article.GET_ALL.path, async (ctx, next) => {
	const { pageId } = ctx.query;
	const { status, data } = await Article [ article.GET_ALL.name ] ({ pageId });
	return ctx.body = resConfig(status, data);
});

router.get(article.GET_ALL_BY_TYPE.path, async (ctx, next) => {
	const { pageId, type } = ctx.query;
	const { status, data } = await Article [ article.GET_ALL_BY_TYPE.name ] ({ type, pageId });
	return ctx.body = resConfig(status, data);
});

router.get(article.GET_ARTICLE_BY_ID.path, async (ctx, next) => {
	const { articleId } = ctx.query;
	// 初始化
	const { status, data } = await Article[ article.GET_ARTICLE_BY_ID.name ] ({ articleId });
	return ctx.body = resConfig(status, data);
});

router.post(article.CREATE_COMMENT.path, async (ctx, next) => {
	const { username, articleId, content, parentId, replyTo } = ctx.request.body;
	const { status, data } = await Article[ article.CREATE_COMMENT.name	] ({ username, articleId, content, parentId, replyTo });
	return ctx.body = resConfig(status, data);
});

router.delete(article.DELETE_COMMENT.path, async (ctx, body) => {
	const { articleId } = ctx.body;
	const { status, data } = await Article[ article.DELETE_COMMENT.name ] ({ articleId });
	return ctx.body = resConfig(status, data);
});

router.get(article.GET_COMMENTS.path, async (ctx, body) => {
	const { pageId, articleId } = ctx.query;
	const { status, data } = await Article[ article.GET_COMMENTS.name ] ({ pageId, articleId });
	return ctx.body = resConfig(status, data);
});

export default router;