var gulp = require('gulp');
var eslint = require('gulp-eslint');

gulp.task('lint', ()=>{
  return gulp.src(['src/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('test', gulp.series('lint', 'file-validation', 'seo-validation'));