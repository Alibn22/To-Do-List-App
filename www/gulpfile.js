var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var uif = require('gulp-if');
var cssnano = require('gulp-cssnano');

gulp.task('watch',['browserSync','useref'],function () {
    gulp.watch('./css,js,html not minify/*.html',['useref']);
    gulp.watch('./css,js,html not minify/*.html',browserSync.reload);
    gulp.watch('./css,js,html not minify/js/*.js',browserSync.reload);
    gulp.watch('./css,js,html not minify/css/*.css',browserSync.reload);
});
gulp.task('useref',function () {
    return gulp.src('./css,js,html not minify/*.html')
            .pipe(useref())
            .pipe(uif('./css,js,html not minify/js/index.main.js',uglify()))
            .pipe(uif('./css,js,html not minify/css/index.main.js',uglify()))
            .pipe(gulp.dest('dist'))
            .pipe(browserSync.reload({
                stream:true
            }))
});
gulp.task('browserSync',function () {
    browserSync.init({
        server:{
            baseDir:'./css,js,html not minify'
        },
    })
});
