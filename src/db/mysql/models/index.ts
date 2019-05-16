import fs = require('fs');
import path = require('path');
import sequelize = require('sequelize');
import assign = require('object-assign');

export default function syncTables (Client: sequelize) {
	const result: any = {};
	const { database } = Client.config;

	const models = getAllModel(database);

	const module = models
		.map(item => ( {[item.name]: require(item.path)(Client, sequelize)}))
		.reduce((prev, next) => assign(prev, next), result);

	return module;
};

function Capitalize (text: string): string {
	return text[0].toUpperCase() + text.slice(1);
}

function getAllModel(name: string) {
	name = name.toLowerCase();
	const dbName = path.join(__dirname, name, '/');
	const tables = fs.readdirSync(dbName);

	return tables
		.map(item => item.slice(0, item.indexOf('.')))
		.map(item => {

			let filename = item;
			const delimiter = '_';
		
			filename = filename.split(delimiter).map( (item, index)=> {
				return index === 0 ? '': Capitalize(item);
			}).join('');

			return {
				name: `T${filename}`,
				path: `${dbName}${item}`,
			}
		});
};
