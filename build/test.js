var gulp = require('gulp');
var eslint = require('gulp-eslint');
const { writeFileSync, readFileSync, existsSync, statSync, unlinkSync, mkdir, rmSync } = require('fs');
const { exec } = require('shelljs');
var { join, extname, parse } = require('path');
const { sync } = require('glob');
const { convert } = require('html-to-text');
var spellErrorFiles = [];
var sampleNames = [];
var sampleJSON = JSON.parse(readFileSync('./src/controls/samples.json', 'utf8'));
var samples = sampleJSON.samples;

gulp.task('lint', () => {
  return gulp.src(['src/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

function getSpelling() {
  let spellingFile = join(__dirname + './../.spelling');
  let spelling = existsSync(spellingFile) ? '\n' + readFileSync(spellingFile, 'utf8') : '';
  return readFileSync('./.spelling', 'utf8') + spelling;
}

function urlPathValidation() {
  for (var i = 0; i < samples.length; i++) {
    var routerPath = samples[i].routerPath.replace(/-/g, ' ').replace(/(^|\s)\S/g, function (t) { return t.toUpperCase() })
    if (samples[i].sampleName != routerPath) {
      sampleNames.push(routerPath);
    }
  }
}

gulp.task('typo', async (done) => {
  await urlPathValidation();
  const fileNames = sync('src/controls/**/*.html', {});
  mkdir(join(__dirname, 'md-temp'), { recursive: true }, (err) => {
    if (err) throw err;
  })
  fileNames.forEach(file => {
    var filePath = join(__dirname, 'md-temp', `${parse(file).name}.txt`);   
    if (extname(file) === '.html') {
      const html = readFileSync(file, 'utf8');
      const text = convert(html, {
        wordwrap: 130
      });
      writeFileSync(filePath, text);
    }    
  })
  writeFileSync('./node_modules/.bin/.spelling', getSpelling());
  const mdspellcmd = `"node_modules/.bin/mdspell" ${__dirname}/md-temp/*.txt -r -n -a -x --color --en-us`;
  const output = exec(mdspellcmd);
  if (output.code !== 0) {
    spellErrorFiles.push(fileName);
  }
  rmSync(`${__dirname}/md-temp/`, { recursive: true, force: true });
  printError(done);
});


function printError(done) {
  if (sampleNames === 0) {
    console.log(`\n******* All files have same path and name *******\n`);
  }
  if (sampleNames != 0) {
    console.log(`\n******* ${sampleNames.length} files not have same path and name *******\n`);
    console.log(`\n${sampleNames.join('\n')}\n`);
  }
  if (spellErrorFiles.length === 0) {
    console.log('\n******* All files are free from spelling errors *******\n');
  }
  if (spellErrorFiles.length != 0) {
    console.log(`\n******* spelling error found in ${spellErrorFiles.length} file*******\n`);
    console.log(`\n${spellErrorFiles.join('\n')}\n`);
    process.exit(1);
  }
  done();
}

gulp.task('test', gulp.series('lint', 'file-validation', 'seo-validation','typo'));
