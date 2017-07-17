var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var uif = require('gulp-if');
var cssnano = require('gulp-cssnano');

gulp.task('watch',['browserSync','useref'],function () {
    gulp.watch('./src/*.html',['useref']);
    gulp.watch('./src/*.html',browserSync.reload);
    gulp.watch('./src/js/*.js',browserSync.reload);
    gulp.watch('./src/css/*.css',browserSync.reload);
});
gulp.task('useref',function () {
    return gulp.src('./src/*.html')
            .pipe(useref())
            .pipe(uif('./src/js/app.min.js',uglify()))
            .pipe(uif('./src/css/*.css',uglify()))
            .pipe(gulp.dest('dist'))
            .pipe(browserSync.reload({
                stream:true
            }))
});
gulp.task('browserSync',function () {
    browserSync.init({
        server:{
            baseDir:'./src'
        },
    })
});
