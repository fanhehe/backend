var del = require('del');
var gulp = require('gulp');
var path = require('path');

var rootDir = path.resolve() || __dirname;

gulp.task('Dir', function () {
    var binDir = path.join(rootDir, 'bin');
    var routesDir = path.join(rootDir, 'routes');
    var suffix = ['*.js', '*.js.map', '**/*.js', '**/*.js.map'];

    var dirArray = [
        binDir,
        routesDir,
    ];
    dirArray.map( (dir) => {
        var exp = suffix.map ( (suffix) => path.resolve(dir, suffix));
        del(exp);
    });
});

gulp.task('App', function () {
    var App = 'app';
    var suffix = ['.js', '.js.map'];
    del(suffix.map((suffix) => App + suffix));
});

gulp.task('clean',['App', 'Dir'], function () {
    console.log('.js 及 .map文件清理完毕');
});

gulp.task('default', function () {
    console.log('------->','gulp clean', '清理.js及.js.map文件');
});
