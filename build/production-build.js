const webpackStream = require('webpack-stream');
const webpack = require('webpack');
const gulp = require("gulp");
const shelljs = require('shelljs');
const runSequence = require('run-sequence');

gulp.task('production-build', function (callback) {
    runSequence('build', 'production', 'copy-files', callback);
});

gulp.task('copy-files', function () {
    shelljs.mkdir('-p', 'dist');
    shelljs.cp('-r', ['index.html', 'favicon.ico', 'assets', 'src'], 'dist');
})

gulp.task('production', function () {
    return gulp.src('.')
        .pipe(webpackStream(require('./../webpack.config.js'), webpack))
        .pipe(gulp.dest('dist'));
});