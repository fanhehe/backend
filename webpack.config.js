var path = require('path');
var webpack = require('webpack');


var webpackConfig = {
    entry: './bin/www.js',
    output: {
        path: path.join(__dirname, './dist'),
        publicPath: '/',
        filename: '[name].js'
    },
    resolve: {
        extensions: ['', 'ts', 'js'],
    },
    module: {
        preLoadersis: [{
            test: /\.ts$/,
            loader: 'eslint',
            exclude: /node_modules/
        },{
            test: /\.js$/,
            loader: 'eslint',
            exclude: /node_modules/
        }],
        loaders: [{
            test: /\.ts$/,
            loader: 'ts',
            exclude: /node_modules/
        }, {
            test: /\.js$/,
            loader: 'babel'
        }],
    },
};

module.exports = webpackConfig;
