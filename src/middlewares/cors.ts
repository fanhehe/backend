const { whiteList } = require('../../config');

export class CORS {

    whiteList: string[];

    constructor (whiteList: string[]) {
        this.whiteList = whiteList || [""];
    }

    public async checkOrigin (ctx, next) {
        const list = whiteList;
        const { origin, host } = ctx.headers;

        const url = origin || host;

        const ensureCORS = list.some(item => item.indexOf(url) != -1);

        if (ensureCORS) {
            ctx.set('Access-Control-Allow-Origin', url);
            ctx.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, Cookie');
            ctx.set('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
            ctx.set('Content-Type', 'application/json;charset=utf-8');
            ctx.set('Access-Control-Allow-Credentials', 'true');
            ctx.set('X-Powered-By',' 3.2.1');
		    await next();
        } else {
            ctx.body = {
                code: 401,
                message: 'no permission for accessing',
            };
        }
    }
};

export default new CORS(whiteList);
