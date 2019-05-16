import { resolve } from 'path';
import { exists, readFile } from 'fs';

const opt: Option = {
    path: '',
    maxAge: 8640000,
};

export default function (options = opt) {
    let { path, maxAge } = options;
    maxAge = maxAge? Math.min( Math.max(0, maxAge), 31556926): 86400;

    const exists = existsIcon(path);
    
    return async function (ctx, next) {

        if (ctx.path !== '/favicon.ico') return await next();

        const result = await exists;
        if (result && path) {
            const icon = await getIcon(path);
            ctx.body = icon;
            ctx.type = 'image/x-icon';
            ctx.set('Cache-Control', `public, max-age=${maxAge}`);
        } else {
            ctx.body = {
                code: 404,
                message: 'icon not found',
            };
        }
    };
};

interface Option {
    path?: string;
    maxAge?: number;
};

function getIcon (path) {
    return new Promise(resolve => {
        readFile(path, (error, icon) => {
            const result = error? null: icon;
            resolve(result);
        });
    }).catch(error => 'not found');
}

function existsIcon (path) {
    return new Promise(resolve => {
        exists(path, (data) => {
            const result = data;
            resolve(result);
        });
    }).catch(error => false);
} 

