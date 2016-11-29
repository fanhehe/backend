const del = require('del');
const gulp = require('gulp');
const path = require('path');
const watch = require('gulp-watch');
const ts = require('gulp-typescript');

const rootDir = path.resolve() || __dirname;
const dbDir = path.join(rootDir, 'db');
const binDir = path.join(rootDir, 'bin');
const routesDir = path.join(rootDir, 'routes');
const modelsBin = path.join(rootDir, 'models');

const dirArray = [
    dbDir,
    binDir,
    routesDir,
    modelsBin,
];

gulp.task('Dir', function () {
    const suffix = ['*.js', '*.js.map', '**/*.js', '**/*.js.map'];
    
    dirArray.map( (dir) => {
        const exp = suffix.map ( (suffix) => path.resolve(dir, suffix));
        del(exp);
    });
});

gulp.task('App', function () {
    const App = 'app';
    const suffix = ['.js', '.js.map'];
    del(suffix.map((suffix) => App + suffix));
});

gulp.task('clean',['App', 'Dir'], function () {
    console.log('.js 及 .map文件清理完毕');
});
gulp.task('default', function () {
    console.log('------->','gulp clean', '清理.js及.js.map文件');
});

gulp.task('dev', function () {
    const suffix = ['*.ts', '**/*.ts'];
    //const pathname = suffix.map(item => path.resolve(__dirname, item));
    const pathname = dirArray.map(item => {})
    const tsConfig = ts.createProject('tsconfig.json', {
        typescript: require('typescript'),
    });
    watch( pathname, function (){
        gulp.src(pathname).pipe(tsConfig());
    });
});
