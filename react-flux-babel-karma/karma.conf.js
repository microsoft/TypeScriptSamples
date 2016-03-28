/* eslint-disable no-var, strict */
'use strict';

var webpackConfig = require('./webpack.config.js');

module.exports = function(config) {
  // Documentation: https://karma-runner.github.io/0.13/config/configuration-file.html
  config.set({
    browsers: [ 'PhantomJS' ],

    files: [
      'test/import-babel-polyfill.js', // This ensures we have the es6 shims in place from babel
      'test/**/*.tests.ts',
      'test/**/*.tests.tsx'
    ],

    port: 9876,

    frameworks: [ 'jasmine' ],

    logLevel: config.LOG_INFO, //config.LOG_DEBUG

    preprocessors: {
      'test/import-babel-polyfill.js': [ 'webpack', 'sourcemap' ],
      'src/**/*.{ts,tsx}': [ 'webpack', 'sourcemap' ],
      'test/**/*.tests.{ts,tsx}': [ 'webpack', 'sourcemap' ]
    },

    webpack: {
      devtool: 'eval-source-map', //'inline-source-map',
      debug: true,
      module: webpackConfig.module,
      resolve: webpackConfig.resolve
    },

    webpackMiddleware: {
      quiet: true,
      stats: {
        colors: true
      }
    },

    // reporter options
    mochaReporter: {
      colors: {
        success: 'bgGreen',
        info: 'cyan',
        warning: 'bgBlue',
        error: 'bgRed'
      }
    },

    // the default configuration
    junitReporter: {
      outputDir: 'test-results', // results will be saved as $outputDir/$browserName.xml
      outputFile: undefined, // if included, results will be saved as $outputDir/$browserName/$outputFile
      suite: ''
    },

    coverageReporter: {
      reporters:[
        //{type: 'html', dir:'coverage/'},  // https://github.com/karma-runner/karma-coverage/issues/123
        {type: 'text'},
        {type: 'text-summary'}
      ],
    }
  });
};
