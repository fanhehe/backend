/**
 * [Check] 以Promise为基础的检测中间件执行函数。通过函数with添加中间件。最后以end来执行。
 * 执行的思想以promise.then的特点为执行流，以`throw exception`来控制检测流程。 
 * @param {[type]} data [待检测的数据]
 * @returns { error? boolean, status: stirng | number } 
 */
export default class Check {

	private data: any;
	private middlewares: any[];

	constructor (data?) {
		this.middlewares = [];
		this.data = data || {};
	};

	with (middleware?, end?: boolean) {
		if (typeof middleware === 'function') this.middlewares.push(middleware);
		if (middleware instanceof Array) middleware.forEach(item => this.with[item]);

		// if (end) return this.end();

		return this;
	};

	end () {
		const { catches, data, check } = this;
		let promise = Promise.resolve(data);

		promise = this.middlewares.reduce((promise, item, index, array) => {
			return promise.then(check(item));
		}, promise);

		return promise.catch(catches);
	};

	private catches (error?: any) {
		return {
			error: true,
			...error,
		}
	};

	private check (middleware) {
		return (data) => middleware(data);
	};
}