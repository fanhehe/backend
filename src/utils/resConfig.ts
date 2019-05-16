
export default function response(status: string | number, data = null, options?: Options): ResponseBody {
	options = options || {};

	const body: any = {};
	const lang = options.lang || 'zh_cn';
	const state = resList[status] || resList.default;
	
	if (data) body.data = data;

	body.code = state.code;
	body.message =  state.message[lang];

	return body;
}

interface ResponseBody {
	message?: string; // 信息
	code?: string | number; // 状态码
	data?: Object; // payload数据
	status?: string | number; //状态
};

interface Options {
	lang?: 'string'; // 语言类型
};

// 遵守 RFC 2616 状态码 本地扩充

// 1
export const C1_CONTINUE = 'C1_CONTINUE';
// 2
export const C2_OK = 'C2_OK';
export const C2_LOGIN_SUCCESS = 'C2_LOGIN_SUCCESS'; // 用户登陆成功
export const C2_LOGOUT_SUCCESS= 'C2_LOGOUT_SUCCESS';// 用户注销成功
export const C2_REGISTER_SUCCESS = 'C2_REGISTER_SUCCESS'; //注册成功
export const C2_ARTICLE_NO_COMMENTS = 'C2_ARTICLE_NO_COMMENTS'; //无评论
// 3
export const C3_NOT_MODIFED = 'C3_NOT_MODIFED';
// 4
export const C4_NOT_FOUND = 'C4_NOT_FOUND';  // 404 资源未找到
export const C4_BAD_REQUEST = 'C4_BAD_REQUEST'; // bad request
// 4. email 错误
export const C4_EMAIL_FORMAT = 'C4_EMAIL_FORMAT'; // 邮箱格式错误
export const C4_EMAIL_DUPLICATE = 'C4_EMAIL_DUPLICATE'; // 该邮箱已被注册

export const C4_NICKNAME_FORMAT = 'C4_NICKNAME_FORMAT'; // 昵称格式错误
export const C4_NICKNAME_DUPLICATE = 'C4_NICKNAME_DUPLICATE'; // 存在相同的昵称

export const C4_USERNAME_FORMAT = 'C4_USERNAME_FORMAT';
export const C4_USERNAME_DUPLICATE = 'C4_USERNAME_DUPLICATE';

export const C4_PASSWORD_FORMAT = 'C4_PASSWORD_FORMAT'; // 密码格式错误
export const C4_USER_SHOULD_LOGIN = 'C4_USER_SHOULD_LOGIN'; //用户应该登陆
export const C4_USER_SHOULD_NOT_LOGIN = 'C4_USER_SHOULD_NOT_LOGIN'; // 用户不应该登陆

export const C4_ACCOUNT_NOT_EXIST = 'C4_ACCOUNT_NOT_EXIST'; // 账号不存在
export const C4_PASSWORD_ERROR = 'C4_PASSWORD_ERROR'; // 密码错误
export const C4_ID_TYPE_ERROR = 'C4_ID_TYPE_ERROR'; // 数据格式错误


// 5
export const C5_BAD_GATEWAY = 'C5_BAD_GATEWAY';
export const C5_SERVER_ERROR = 'C5_SERVER_ERROR';
export const C5_REGISTER_ERROR = 'C5_REGISTER_ERROR';

const resList = {
	200: {
		code: 200,
		message: {
			zh_cn: '成功',
			en_us: ''
		},
	},
	[C2_OK]: {
		code: 200,
		message: {
			zh_cn: '成功',
			en_us: 'ok',
		},
	},
	[C2_REGISTER_SUCCESS]: {
		code: 200,
		message: {
			zh_cn: '注册成功',
			en_us: '',
		}
	},
	[C2_LOGIN_SUCCESS]: {
		code: 200,
		message: {
			zh_cn: '登陆成功',
			en_us: '',
		},
	},
	[C2_LOGOUT_SUCCESS]:{
		code: 200,
		message: {
			zh_cn: '退出成功',
			en_us: ''
		},
	},
	[C2_ARTICLE_NO_COMMENTS]: {
		code: 2001,
		message: {
			zh_cn: '该文章无评论',
			en_us: ''
		}
	},
	[C4_NOT_FOUND]: {
		code: 404,
		message: {
			zh_cn: '您访问的资源不存在',
			en_us: ''
		},
	},
	[C4_USER_SHOULD_NOT_LOGIN]: {
		code: 4000,
		message: {
			zh_cn: '用户已登录',
			en_us: '',
		}
	},
	[C4_USER_SHOULD_LOGIN]: {
		code: 40001,
		message: {
			zh_cn: '用户未登陆',
			en_us: '',
		},
	},
	[C4_EMAIL_FORMAT]: {
		code: 4001,
		message: {
			zh_cn: '邮箱格式错误',
			en_us: ''
		},
	},
	[C4_EMAIL_DUPLICATE]: {
		code: 4002,
		message: {
			zh_cn: '此邮箱已被使用',
			en_us: ''
		},
	},
	[C4_NICKNAME_FORMAT]: {
		code: 4003,
		message: {
			zh_cn: '不能使用非法字符',
			en_us: ''
		},
	},
	[C4_NICKNAME_DUPLICATE]: {
		code: 4004,
		message: {
			zh_cn: '此昵称已被使用',
			en_us: ''
		},
	},
	[C4_PASSWORD_FORMAT]: {
		code: 4005,
		message: {
			zh_cn: '密码格式错误',
			en_us: ''
		},
	},
	[C4_ACCOUNT_NOT_EXIST]: {
		code: 4006,
		message: {
			zh_cn: '账号不存在',
			en_us: '',
		},
	},
	[C4_PASSWORD_ERROR]: {
		code: 4007,
		message: {
			zh_cn: '密码输入错误',
			en_us: '',
		},
	},
	[C4_ID_TYPE_ERROR]: {
		code: 4008,
		message: {
			zh_cn: '输入数据格式错误',
			en_us: '',
		},
	},
	[C4_USERNAME_DUPLICATE]: {
		code: 4009,
		message: {
			zh_cn: '用户名已被使用',
			en_us: '',
		},
	},
	[C4_USERNAME_FORMAT]: {
		code: 4010,
		message: {
			zh_cn: '用户名格式错误',
			en_us: '',
		},
	},
	[C5_SERVER_ERROR]: {
		code: 500,
		message: {
			zh_cn: '网络繁忙,请稍后再试',
			en_us: '',
		},
	},
	[C5_REGISTER_ERROR]: {
		code: 5001,
		message: {
			zh_cn: '注册失败',
			en_us:'',
		}
	},
	default: {
		code: 404,
		message: {
			zh_cn: '您访问的资源不存在',
			en_us: ''
		},
	},
};