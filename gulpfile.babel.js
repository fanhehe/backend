const del = require('del');
const gulp = require('gulp');
const path = require('path');
const watch = require('gulp-watch');
const ts = require('gulp-typescript');

const rootDir = path.resolve() || __dirname;
const srcDir = path.resolve(rootDir, 'src');

gulp.task('default', function () {
    console.log('\n');
    console.log('------->','gulp dev : ', '检测.ts 自动编译');
    console.log('------->','gulp clean : ', '清理.js及.js.map文件');
    console.log('\n');
    
    // console.log('------->','gulp build', '编译.ts');
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

    const binDir = path.resolve(rootDir, 'bin');

    const suffix = ['*.ts', '**/*.ts'];
    const tsConfig = ts.createProject('tsconfig.json', {
        typescript: require('typescript'),
    });

    const Src = suffix.map(item => path.resolve(srcDir, item));
    const Bin = suffix.map(item => path.resolve(binDir, item));

    const Watch = Src.concat(Bin);

    watch(Watch, function () {
        gulp.src(Src).pipe(tsConfig()).pipe(gulp.dest(srcDir));
        //gulp.src(Bin).pipe(tsConfig()).pipe(gulp.dest(binDir));
        console.log('重新编译完成');
    });
});
