const gulp = require("gulp");
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./../webpack.config.js');
var argv = require('yargs').argv;
const port = argv.port || 9000;


gulp.task('serve-run',(done)=>{
  const serverOptions = {
    port: port,
    static: {
      directory: './',
    },
    hot: true,
    open: true,
    historyApiFallback: true
  };

  const compiler = webpack(config);
  const server = new WebpackDevServer(serverOptions, compiler);
  server.startCallback(() => {
    console.log('Reports JS sample browser is listening on localhost:', port);
    done();
  });
});

gulp.task('serve', gulp.series('build','serve-run'));