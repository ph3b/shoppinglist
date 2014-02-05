'use strict';

angular.module('shoppinglistApp')
  .filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  	};
  });
