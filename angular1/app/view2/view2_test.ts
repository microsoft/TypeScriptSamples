'use strict';

describe('myApp.view2 module', () => {
  beforeEach(module('myApp.view2'));

  describe('view2 controller', () => {
    it('should be defined', inject($controller => {
      let view2Ctrl: View2Controller = $controller('View2Ctrl');
      expect(view2Ctrl).toBeDefined();
    }));
  });
});
