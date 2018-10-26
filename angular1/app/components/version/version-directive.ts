'use strict';

angular.module('myApp.version.version-directive', [])
  .directive('appVersion', ['version', version => {
    return (scope, element, attributes) => {
      element.text(version);
    };
  }]);
