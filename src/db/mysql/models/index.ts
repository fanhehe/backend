import fs = require('fs');
import path = require('path');
import assign = require('object-assign');
import sequelize = require('sequelize');

module.exports =  function main (DBClient, dbName?: string) {
	dbName = dbName? dbName: 'main';
	const models = getAllModel(dbName);
	
	const module = models
		.map(item => ( {[item.name]: require(item.path)(DBClient, sequelize)}))
		.reduce((prev, next) => {
			return assign(prev, next);
		}, {});
	return module;
};

function getAllModel(name: string) {
	const dbName = path.join(__dirname, name, '/');
	const tables = fs.readdirSync(dbName);

	return tables
		.filter(item => item.indexOf('.ts') !== -1)
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

	function Capitalize (text: string): string {
		return text[0].toUpperCase() + text.slice(1);
	}
};
