const webpackStream = require('webpack-stream');
const webpack = require('webpack');
const gulp = require("gulp");
const shelljs = require('shelljs');
const runSequence = require('gulp4-run-sequence');

gulp.task('production-build', (done)=>{
    runSequence('build', 'production', 'copy-files', done);
});

gulp.task('copy-files', (done)=>{
    shelljs.mkdir('-p', 'dist');
    shelljs.cp('-r', ['index.html', 'favicon.ico', 'assets', 'src', 'scripts'], 'dist');
    done();
})

gulp.task('production', (done)=>{
    return gulp.src('.')
        .pipe(webpackStream(require('./../webpack.config.js'), webpack))
        .pipe(gulp.dest('dist'));
});