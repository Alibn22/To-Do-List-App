var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var sd = require('gulp-lazy-minify');

gulp.task('watch',['browserSync'],function () {
    gulp.watch('./src/*.html',browserSync.reload);
    gulp.watch('./src/js/*.js',browserSync.reload);
    gulp.watch('./src/css/*.css',browserSync.reload);
});
gulp.task('useref',function () {
    return gulp.src('./src/*.html')
            .pipe(useref())
            .pipe(gulp.dest('./src/dist'))
            //.pipe(browserSync.reload({
             //   stream:true
           // }))
});
gulp.task('browserSync',function () {
    browserSync.init({
        server:{
            baseDir:'./src'
        },
    })
});
gulp.task('minifyjs',function () {
    return gulp.src(['./src/dist/js/app.main.js','./src/dist/js/vendor.main.js'])
    .pipe(sd())
    .pipe(gulp.dest('./src/dist/min/js'))
});
gulp.task('minifycss',function () {
    return gulp.src(['./src/dist/css/app.main.css','./src/dist/css/vendor.main.css'])
    .pipe(sd())
    .pipe(gulp.dest('./src/dist/min/css'))
});