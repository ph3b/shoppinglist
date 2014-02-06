'use strict';

angular.module('shoppinglistApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'firebase'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/ferdig', {
        templateUrl: 'views/ferdig.html',
        controller: 'FerdigCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
