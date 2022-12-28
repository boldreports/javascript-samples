const gulp = require("gulp");
var shelljs = require('shelljs');
const runSequence = require('gulp4-run-sequence');

gulp.task('build', function (done) {
    runSequence('clean', 'new-tab', done);
});

gulp.task('clean', function (done) {
    shelljs.rm('-rf', 'dist');
    shelljs.rm('-rf', 'demos');
    done();
});