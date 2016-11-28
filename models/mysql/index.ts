import fs = require('fs');
import path = require('path');
import sequelize from 'sequelize';

export default function main (DBClient, database) {
    let pathname: string;
    const MAIN = 'main';
    const model = new Model(DBClient);
    switch (database) {
        case MAIN: pathname
    }
};

function Model (DBClient, database?) {
    this._connection = DBClient;
}
function getAllModel(path: string) {

    const dir = fs.readdirSync(path);
    const pathname = path[path.length - 1] === '/'? '': '/';

    return dir.map(item => {

        let filename = item;
        const delimiter = '_';
        
        filename = filename.slice(0, filename.indexOf('.'));
        filename = filename.split(delimiter).map( (item, index)=> {
            return index === 0 ? '': Capitalize(item);
        }).join();

        return {
            name: `T${filename}`,
            module: require(`${pathname}${item}`),
        }
    });

    function Capitalize (text: string): string {
        return text[0].toUpperCase() + text.slice(1);
    }
};
