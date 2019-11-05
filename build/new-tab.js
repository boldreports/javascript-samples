const gulp = require("gulp");
const fs = require("fs");
const webpackStream = require('webpack-stream');
const webpack = require('webpack');
const shelljs = require('shelljs');
const runSequence = require('run-sequence');

gulp.task('new-tab', function (callback) {
  runSequence('new-tab-compilation', 'new-tab-generation', callback);
});

gulp.task('new-tab-generation', function () {
  let reportViewerDir = './demos/report-viewer';
  shelljs.mkdir('-p', reportViewerDir);

  let srcDir = './src/controls';
  let samples = JSON.parse(fs.readFileSync(`${srcDir}/samples.json`, 'utf8')).samples;
  let htmlTemplate = fs.readFileSync(`./build/templates/common/index.html`, 'utf8');
  //reports-viewer
  for (let i = 0; i < samples.length; i++) {
    let sampleData = samples[i];
    shelljs.cp('-r', `${srcDir}/${sampleData.directoryName}`, `${reportViewerDir}`);
    let bodyContent = fs.readFileSync(`${reportViewerDir}/${sampleData.directoryName}/${sampleData.routerPath}.html`, 'utf8');
    let content = htmlTemplate
      .replace('{{body}}', bodyContent)
      .replace('{{title}}', `${sampleData.sampleName} | Preview | JavaScript Report Viewer`)
      .replace('{{sampleName}}', sampleData.sampleName);
    shelljs.mkdir('-p', `${reportViewerDir}/${sampleData.directoryName}/preview`);
    fs.writeFileSync(`${reportViewerDir}/${sampleData.directoryName}/preview/index.html`, content, {
      encoding: 'utf8'
    });
    let jsContent = fs.readFileSync(`${reportViewerDir}/${sampleData.directoryName}/${sampleData.routerPath}.js`, 'utf8');
    fs.writeFileSync(`${reportViewerDir}/${sampleData.directoryName}/preview/index.js`, jsContent, {
      encoding: 'utf8'
    });

    fs.unlinkSync(`${reportViewerDir}/${sampleData.directoryName}/${sampleData.routerPath}.html`)
    fs.unlinkSync(`${reportViewerDir}/${sampleData.directoryName}/${sampleData.routerPath}.js`)
  }

  //reports-designer
  shelljs.cp('-r', `./build/templates/report-designer/`, `./demos`);
});

gulp.task('new-tab-compilation', function () {
  return gulp.src('.')
    .pipe(webpackStream(require('./templates/common/webpack.config'), webpack))
    .pipe(gulp.dest('demos/common'));
});