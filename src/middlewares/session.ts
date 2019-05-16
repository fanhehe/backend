import redis = require('ioredis');
import session, { Store } from 'koa-session2';

const config = require('../../config');

class RedisStore extends Store{

	private redis: any;
	private prefix: string;

	constructor (options) {
		super();
		const { db, port, host, password } = options;

		this.prefix = options.prefix || 'SID';
		try {
			this.redis = new redis(port, host, { db, password });
		} catch (e) { console.log(e); }
	};

	encode (obj) {
		const string = JSON.stringify(obj);
		return new Buffer(string).toString('base64');
	};

	decode (string: string) {
		if (!string) return '';
		let obj = '';

		try {
			obj = new Buffer(string, 'base64').toString();
		} catch (error) {}

		return JSON.parse(obj);
	};
	async get (sid) {
		const prefix = this.prefix;
		const session = await this.redis.get(`${prefix}${sid}`);
		return this.decode(session);
	};

	async set (session, opts: { sid?: string | number }) {
		let { sid } = opts;
		const prefix = this.prefix;

		if (!sid) sid = super.getID(24);

		session.salt = sid; // 加盐.
		session = this.encode(session);
		await this.redis.set(`${prefix}${sid}`, session);

		return sid;
	};

	async destroy (sid) {
		const prefix = this.prefix;
		return await this.redis.del(`${prefix}${sid}`);
	};
};

export default function (app) {
	const key = 'FANHEHE.ID';
	const options = config.storage.session;
	const store = new RedisStore(options);

	return new session({
		key,
		store,
		maxAge: 1000 * 60 * 60 * 24,
	});
};
