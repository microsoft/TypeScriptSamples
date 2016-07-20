'use strict';

describe('myApp.view2 module', function() {

  beforeEach(module('myApp.view2'));

  describe('view2 controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var view2Ctrl:View2Controller = $controller('View2Ctrl');
      expect(view2Ctrl).toBeDefined();
    }));

  });
});
