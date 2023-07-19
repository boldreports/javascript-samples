const gulp = require("gulp");
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./../webpack.config.js');
const open = require('open');
var argv = require('yargs').argv;
const port = argv.port || 9000;


gulp.task('serve-run',(done)=>{
  const server = new WebpackDevServer(webpack(config));
  server.listen(port, 'localhost', function (err) {
    if (err) {
      console.log(err);
    }
    console.log('Reports JS sample browser is listening on localhost:', port);
    open('http://localhost:' + port + '/');
  });
  done();
});

gulp.task('serve', gulp.series('build','serve-run'));