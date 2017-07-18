var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var runSequence = require('run-sequence');
var m = require('gulp-lazy-minify');
var min = require('gulp-minify');
var minc = require('gulp-clean-css');

gulp.task('watch', ['browserSync'], function () {
    gulp.watch('./src/*.html', browserSync.reload);
    gulp.watch('./src/js/*.js', browserSync.reload);
    gulp.watch('./src/css/*.css', browserSync.reload);
});
gulp.task('useref', function () {
    return gulp.src('./src/*.html')
        .pipe(useref())
        .pipe(gulp.dest('./www'))
});
gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: './src'
        },
    })
});
gulp.task('minifyjs', function () {
    gulp.src('./www/js/*.js')
        .pipe(min())
        .pipe(gulp.dest('./www/js'))

});
gulp.task('minifycss', function () {
    gulp.src('./www/css/*.css')
        .pipe(minc({compatibility: 'ie8'}))
        .pipe(gulp.dest('./www/css'))
});
gulp.task('build', function (callback) {
    runSequence('useref', ['minifyjs', 'minifycss'], callback)
});