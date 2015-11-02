'use strict';

var Server = require('karma').Server;
var path = require('path');
var gutil = require('gulp-util');

module.exports = {
  watch: function() {
    // Documentation: https://karma-runner.github.io/0.13/dev/public-api.html
    var karmaConfig = {
      configFile: path.join(__dirname, '../karma.conf.js'),
      singleRun: false,

      // Fancy runner
      plugins: ['karma-webpack', 'karma-jasmine', 'karma-mocha-reporter', /*'karma-junit-reporter', 'karma-coverage', */'karma-sourcemap-loader', 'karma-phantomjs-launcher', 'karma-phantomjs-shim'], // karma-phantomjs-shim only in place until PhantomJS hits 2.0 and has function.bind
      reporters: ['mocha']
    };

    new Server(karmaConfig, karmaCompleted).start();

    function karmaCompleted(exitCode) {
      gutil.log('Karma has exited with:', exitCode);
      process.exit(exitCode);
    }
  }
};
