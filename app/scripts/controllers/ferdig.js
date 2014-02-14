'use strict';

angular.module('shoppinglistApp')
    .controller('FerdigCtrl', function ($scope, $firebase, $route) {
        $scope.arkivList = $firebase(new Firebase("https://xlib.firebaseio.com/slapp/arkiv"));
        $scope.arkivList.$on("change", function () {
            $scope.getLength = $scope.arkivList.$getIndex().length
        });
        $scope.emptyArchive = function () {
            $scope.arkivList.$remove();
        }
    });
