/* eslint-disable no-var, strict, prefer-arrow-callback */
'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var eslint = require('gulp-eslint');
var yargs = require("yargs").argv;

var webpack = require('./gulp/webpack');
var staticFiles = require('./gulp/staticFiles');
var tests = require('./gulp/tests');
var clean = require('./gulp/clean');
var inject = require('./gulp/inject');

var isDebug = yargs.mode === "Debug";

var lintSrcs = ['./gulp/**/*.js'];

gulp.task('delete-dist', function (done) {
  clean.run(done);
});

gulp.task('build-process.env.NODE_ENV', function () {
  process.env.NODE_ENV = 'production';
});

gulp.task('build-js', ['delete-dist', 'build-process.env.NODE_ENV'], function(done) {
  webpack.build().then(function() { done(); });
});

gulp.task('build-other', ['delete-dist', 'build-process.env.NODE_ENV'], function() {
  staticFiles.build();
});

gulp.task('build-release', ['build-js', 'build-other', 'lint'], function () {
    inject.build();
});

gulp.task('build', isDebug ? [] : ['build-release'], function () {
    if (isDebug) {
        gutil.log(gutil.colors.red("In debug mode so not building client side code; your gulp watch task should be running. Type 'npm run watch' at the command prompt in the project directory or run the watch task using Task Runner Explorer. (If using Task Runner Explorer you will need to go to Tools -> Options -> External Web Tools and ensure that $(PATH) is the preferred location to use. You should have npm 3 installed to avoid long path hell.)"));
    }
});

gulp.task('lint', function () {
  return gulp.src(lintSrcs)
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('watch', ['delete-dist'], function(done) {
  process.env.NODE_ENV = 'development';
  Promise.all([
    webpack.watch()//,
    //less.watch()
  ]).then(function() {
    gutil.log('Now that initial assets (js and css) are generated inject will start...');
    inject.watch();
    done();
  }).catch(function(error) {
    gutil.log('Problem generating initial assets (js and css)', error);
  });

  gulp.watch(lintSrcs, ['lint']);
  staticFiles.watch();
  tests.watch();
});

gulp.task('watch-and-serve', ['watch'], function() {
  // local as not required for build
  var express = require('express')
  var app = express()

  app.use(express.static('dist', {'index': 'index.html'}))
  app.listen(8080);
});
