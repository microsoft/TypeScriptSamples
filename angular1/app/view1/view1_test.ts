'use strict';

describe('myApp.view1 module', () => {
  beforeEach(module('myApp.view1'));

  describe('view1 controller', () => {
    it('should be defined', inject($controller => {
      let view1Ctrl: View1Controller = $controller('View1Ctrl');
      expect(view1Ctrl).toBeDefined();
    }));
  });
});
