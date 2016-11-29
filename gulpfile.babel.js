const del = require('del');
const gulp = require('gulp');
const path = require('path');
const watch = require('gulp-watch');
const ts = require('gulp-typescript');

const rootDir = path.resolve() || __dirname;
const srcDir = path.resolve(rootDir, 'src');

gulp.task('default', function () {
    console.log('------->','gulp clean', '清理.js及.js.map文件');
});

gulp.task('cleanSrc', function () {
    const suffix = ['*.js', '*.js.map', '**/*.js', '**/*.js.map'];
    const exp = suffix.map ( (suffix) => path.resolve(srcDir, suffix));

    del(exp);
});
gulp.task('cleanBin', function () {
    const binDir = path.resolve(rootDir, 'bin');
    const suffix = ['*.js', '*.js.map', '**/*.js', '**/*.js.map'];
    const exp = suffix.map ( (suffix) => path.resolve(binDir, suffix));

    del(exp);
});

gulp.task('clean',['cleanSrc', 'cleanBin'], function () {
    console.log('.js 及 .map文件清理完毕');
});

gulp.task('dev', function () {
    const suffix = ['*.ts', '**/*.ts'];
    const pathname = dirArray.map(item => path.resolve(srcDir, item));
    const tsConfig = ts.createProject('tsconfig.json', {
        typescript: require('typescript'),
    });

    watch( pathname, function (){
        gulp.src(pathname).pipe(tsConfig());
    });
});
