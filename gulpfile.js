let gulp = require("gulp");
let sass = require("gulp-sass-china");
let browserSync = require("browser-sync");

gulp.task('serve',['sass'],function(){
    //初始化项目跟目录为'./'（也可以使用代理proxy: "yourlocal.dev"）
    browserSync.init({
        server: './'
    });
    //创建gulp监听器，监听sass文件的变化，自动执行'sass'任务，编译less并生成css文件
    gulp.watch('./scss/*.scss', ['sass']).on('change', function(event){
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
    //监听html文件的变化，自动重新载入
    gulp.watch('./*.html').on('change', browserSync.reload);
    gulp.watch('./*.js').on('change', browserSync.reload);
});
//创建自动编译sass的任务，这边需要return stream以保证browserSync.reload在正确的时机调用
gulp.task('sass', function(){
    return gulp.src('./scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.stream());
});
//默认启动的gulp任务数组['serve']
gulp.task('default', ['serve']);