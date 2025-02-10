const gulp = require("gulp");
const fs = require("fs");
const webpackStream = require('webpack-stream');
const webpack = require('webpack');
const shelljs = require('shelljs');
const runSequence = require('gulp4-run-sequence');

gulp.task('new-tab', (done)=>{
  runSequence('new-tab-compilation', 'new-tab-generation', done);
});

gulp.task('new-tab-generation', (done)=>{
  let reportBaseDir = './demos/';
  shelljs.mkdir('-p', reportBaseDir);

  let srcDir = './src/controls';
  let samples = JSON.parse(fs.readFileSync(`${srcDir}/samples.json`, 'utf8')).samples;
  let htmlTemplate = fs.readFileSync(`./build/templates/common/index.html`, 'utf8');

  //report samples
  for (let i = 0; i < samples.length; i++) {
    let sampleData = samples[i];
    let title = sampleData.metaData.title;
    if (!title) {
      title = sampleData.sampleName;
    }
    let sampleName = title;
    title = `${title} | Preview | JavaScript Report`;
    if (title.length < 45) {
      title = `${title} | Bold Reports`;
    }
    let fileName = sampleData.routerPath ? sampleData.routerPath : sampleData.basePath;
    let reportRouterPath = sampleData.routerPath ? sampleData.basePath + '/' + sampleData.routerPath : sampleData.basePath;
    shelljs.mkdir('-p', reportBaseDir + reportRouterPath);
    shelljs.cp('-r', `${srcDir}/${sampleData.directoryName}/*`, `${reportBaseDir + reportRouterPath}`);
    let bodyContent = fs.readFileSync(`${reportBaseDir + reportRouterPath}/${fileName}.html`, 'utf8');
    let content = htmlTemplate
      .replace('{{body}}', bodyContent)
      .replace(/{{title}}/g, title)
      .replace('{{sampleName}}', sampleName);
    shelljs.mkdir('-p', `${reportBaseDir + reportRouterPath}/preview`);
    fs.writeFileSync(`${reportBaseDir + reportRouterPath}/preview/index.html`, content, {
      encoding: 'utf8'
    });
    let jsContent = fs.readFileSync(`${reportBaseDir + reportRouterPath}/${fileName}.js`, 'utf8');
    fs.writeFileSync(`${reportBaseDir + reportRouterPath}/preview/index.js`, jsContent, {
      encoding: 'utf8'
    });

    fs.unlinkSync(`${reportBaseDir + reportRouterPath}/${fileName}.html`)
    fs.unlinkSync(`${reportBaseDir + reportRouterPath}/${fileName}.js`)
  }

  //reports-designer
  shelljs.cp('-r', `./build/templates/report-designer/`, `./demos`);
  done();
});

gulp.task('new-tab-compilation', ()=> {
  return gulp.src('.')
    .pipe(webpackStream(require('./templates/common/webpack.config'), webpack))
    .pipe(gulp.dest('demos/common'));
});