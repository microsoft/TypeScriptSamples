'use strict';

angular.module('myApp.version.interpolate-filter', [])
  .filter('interpolate', ['version', version => {
    return text => String(text).replace(/\%VERSION\%/mg, version);
  }]);
