'use strict';

describe('Controller: FerdigCtrl', function () {

  // load the controller's module
  beforeEach(module('shoppinglistApp'));

  var FerdigCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FerdigCtrl = $controller('FerdigCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
