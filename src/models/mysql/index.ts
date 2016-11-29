import fs = require('fs');
import path = require('path');
import sequelize from 'sequelize';

module.exports =  function main (DBClient, dbName: string) {

    const models = getAllModel(dbName);
    return {
        ... models.map(item => ( {[item.name]: require(item.path)}) ),
    };
};

function getAllModel(name: string) {
    const dbName = path.join(__dirname, name, '/');
    const tables = fs.readdirSync(dbName);

    return tables.map(item => {

        let filename = item;
        const delimiter = '_';
        
        filename = filename.slice(0, filename.indexOf('.'));
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
