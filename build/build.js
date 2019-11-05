const gulp = require("gulp");
var shelljs = require('shelljs');
const runSequence = require('run-sequence');

gulp.task('build', function (callback) {
    runSequence('clean', 'new-tab', callback);
});

gulp.task('clean', function () {
    shelljs.rm('-rf', 'dist');
    shelljs.rm('-rf', 'demos');
});