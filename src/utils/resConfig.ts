import * as types from '../constants/response';

export default function response(status: string, data = {}, options?: Options) :ResponseBody {
	const body:any = {};
	const state = resList[status] || resList.default;

	body.data = data;
	body.code = state.code;
	body.message =  state.message[options.lang]|| state.message.zh_cn;

	return body;
}

const resList = {
	[types.C2_OK]: {
		code: 200,
		message: {
			zh_cn: '成功',
			en_us: 'ok',
		},
	},
	[types.C4_NOT_FOUND]: {
		code: 404,
		message: {
			zh_cn: '您访问的资源不存在',
			en_us: ''
		},
	},
	[types.C5_SERVER_ERROR]: {
		code: 500,
		message: {
			zh_cn: '网络繁忙,请稍后再试',
			en_us: '',
		},
	},
	default: {
		code: 404,
		message: {
			zh_cn: '您访问的资源不存在',
			en_us: ''
		},
	},
}
interface ResponseBody {
	message: string; // 信息
	code: string | number; // 状态码
	data?: Object; // payload数据
	status?: string | number; //状态
};

interface Options {
	lang?: 'string'; // 语言类型
};