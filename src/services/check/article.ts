/**
 * check 中间件函数文件， 涉及所有关于artcile表和article_comments表的检测方法，均为纯函数。
 * 一般规定最后一个参数为待测数据，而之前的参数为附加配置的参数。
 * 禁止从外部获取数据。
 */
/**
 * 总览
 * pageCount: 所有关于分页的数据，页数统计后存于pageCount变量。
 */

import * as types from '../../utils/resConfig';
import { article } from '../../common/constants/request';
/**
 * [checkId 检查文章id,articleId应该大于零 ] 
 * @param {[type]} data [description] 待检查的数据
 */
export function checkArticleId (data) {
	let { articleId: id } = data;
	id = id && id > 0? +id: null;

	if (typeof id !== 'number' || isNaN(id)) throw { status: types.C4_ID_TYPE_ERROR };

	return { ...data, articleId: id };
}
/**
 * [checkPageId 分页组件检查pageId, pageId大于一]
 * @param {[Object]} data [description] 待检查的数据
 */
export function checkPageId (data) {
	let { pageId: id } = data;
	id = id && id > 0? +id: 0;

	if (typeof id !== 'number' || isNaN(id) || id <= 0) throw { status: types.C4_ID_TYPE_ERROR };

	return { ...data, pageId: id };
};

/**
 * [getArticle 获取单个文章信息]
 * @param {[type]} options [description]
 * @param {`type]} data    [description]
 */
export async function getArticle (options, data) {
	const { table } = options;
	const { articleId: id } = data;
	
	const method = 'findOne';
	const where  = { id, status: 1 };
	 // 查询并获取数量 返回 { rows: Object[], count: Number }
	const article = await select({ table, where, method });
	// 如果文章不存在
	if (!article) {}
	return { ...data, result: article };
};

/**
 * [getAuthorInfo 获取的文章信息获取相关的作者信息]
 * @param {[type]} options [description]
 * @param {[type]} data    [description]
 */
export async function getArticleAuthor (options, data) {
	const { table } = options;
	const { result: article } = data;

	const method = 'findOne';
	const attributes = ['username', 'preview', 'nickname'];

	const where = { username: article.author };
	const userInfo = await select({ table, where, method, attributes });

	if (!userInfo) {}
	article.dataValues.up = userInfo;
	return { ...data };
}
/**
 * [getComments 获取相关文章的评论]
 * @param 
 */
export async function getComments (options, data) {
	
	const { table } = options;
	const { articleId, pageId } = data;
	// 查询数据库选项
	const method = 'findAndCount';
	const order = 'create_time DESC';
	const where = { articleId, parentId: null };
	const { limit } = article.GET_COMMENTS;
	const offset = limit * (pageId -1);

	// 查询数据库
	const comments = await select({ table, method, where, limit, offset, order });
	if (!(comments && comments.rows.length)) throw { status: types.C2_ARTICLE_NO_COMMENTS };
	return { ...data, comments };
}
/**
 * [getChildComments 获得相关文章评论的子评论] 
 * @param {[Object]} options [获取相关信息] 
 * @param {[Object]} data    [description]
 */
export async function getChildComments (options, data) {
	let childComments = [];
	const { table } = options;
	const { articleId, pageId, comments } = data;
	const parentIds = comments.rows.map( row => row.id );
	// 查询数据库选项
	const offset = 0;
	const order = 'create_time';
	const method = 'findAndCount';
	const { limit } = article.GET_CHILD_COMMETNS;
	
	// 获取所有的
	for (const parentId of parentIds) {
		const comment = await select({ table, method, where: { parentId, articleId }, limit, offset, order });
		if (comment && comment.rows && comment.rows.length) childComments.push(comment);
	}
	return { ...data, childComments };
}
/**
 * [getCommentsAuthor 获取评论的作者]
 * @param {[type]} options [description]
 * @param {[type]} data    [description]
 */
export async function getCommentsAuthor (options, data) {
	let usernames = [];
	const { table } = options;
	const { comments, childComments } = data;

	// 从评论中获取用户名
	comments.rows.map(comment => usernames.push(comment.username));
	childComments.map(item => item.rows.map(comment => usernames.push(comment.username)));

	// usernames 去重
	usernames = Array.from(new Set(usernames));
	// 查询数据库选项
	const method = 'findAll';
	const attributes = ['username', 'nickname', 'preview'];
	const where = { username: usernames };
	const users = await select({ table, method, where, attributes});

	return { ...data, usernames: users };
}
/**
 * [combineComments 将评论与up信息组合]
 * @param {[type]} data [获取到的data数据]
 */
export async function combineComments (data) {
	let { childComments } = data;
	const { comments, usernames } = data;
	const { limit: commentLimit } = article.GET_COMMENTS;
	const { limit: childCommentsLimit } = article.GET_CHILD_COMMETNS;
	// 为每个子评论添加发布者信息
	for (const item of childComments) {
		// 子评论分页
		item.limit = childCommentsLimit;
		item.pageCount = Math.ceil(item.count / childCommentsLimit);
		//子评论添加发布者信息
		for (const row of item.rows) {
			row.dataValues.up = usernames.filter(user => user.username ===  row.username)[0] || {};
		}
	}
	//评论分页
	comments.pageCount = Math.ceil(comments.count / commentLimit);
	// 为每个评论添加发布者信息
	for (const comment of comments.rows) {
		// 为每个评论添加发布者信息
		comment.dataValues.up = usernames.filter(user => user.username ===  comment.username)[0];
		// 为每个评论添加子评论
		comment.dataValues.subComments  = childComments.filter(item => item.rows[0] && comment.id === item.rows[0].parentId)[0] || undefined;
	}
	return { result: comments };
}
/**
 * [getArticleList 获取文章列表] 
 * @param {[Object]} options [description]
 * @param {[Object]} data [description]
 */
export async function getArticles (options, data) {
	const { table } = options;
	const { pageId, limit } = data;
	const offset = (pageId - 1) * limit;
	
	const where  = { status: 1 };
	const method = 'findAndCount'; // 查询并获取数量 返回 { rows: Object[], count: Number }
	const selectResult = await select({ table, where, method, limit, offset });
	// 如果文章不存在或者文章非数组 则抛错
	if (!(selectResult && selectResult.rows instanceof Array)) throw { status: types.C5_BAD_GATEWAY };
	// 分页换算
	selectResult.pageCount = Math.ceil( selectResult.count / limit);
	return { ...data, result: selectResult };
};
/**
 * [getAuthorsInfo 根据 获取的文章列表信息获取相关的作者信息] 
 * @param {[Object]} options [description] 
 * @param {[Object]} data    [description]
 */
export async function getAuthorsInfo (options, data) {
	const { table } = options;
	const { result: articles } = data;
	
	const method = 'findAll';
	const attributes = ['username', 'preview', 'nickname'];
	// 获取所有选出的文章的作者-用户名并去重
	let userList = articles.rows.map(row => row.author);
	userList = Array.from(new Set(userList));

	const where = { username: userList, status: 1 };
	const users = await select({table, where, method, attributes});
	// 如果根据文章获取的作者信息非数组则抛错。
	if (!(users instanceof Array)) throw { status: types.C4_USERNAME_FORMAT};
	// 重组信息
	articles.rows = articles.rows.map(row => {
		row.dataValues.up = users.filter((user, index)=> user.username ===  row.author)[0] || {};
		return row;
	});
	return { ...data, result: articles };
};
export async function createComment (options, data) {
	const { table } = options;
	const values = data;
	const comment = await create({ table, data: values });
	return { ...data, result: comment, comment };
};
// 一下为每个check文件都可复用的函数

/**
 * [select description] 从数据库中查询数据
 * @param {string; }} options       [description]
 * @param {[type]}     data [description]
 */
export const select = async (options: { table: any; method: string; where?: any; attributes?: any; limit?: number; offset?: number; order?: any }) => {
	const { method } = options;
	const Table = options.table;
	
	// 初始化
	delete options.table;
	delete options.method;
	const condition = options;

	return await Table[method](condition)
		.then(data   => data? data: { error: true })
		.catch(error => { console.log(error); return { error: true }; });
};
/**
 * [create description]
 * @param {any} options [description]
 */
export const create = async (options: any) => {
	const { table: Table, data } = options;
	// 初始化
	delete options.table;

	return await Table.create(data)
		.then(data => data)
		.catch(error => { console.log(error); return { error: true }; });
};
export function s() {};