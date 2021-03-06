'use strict';

angular.module('shoppinglistApp')
    .controller('MainCtrl', function ($scope, $firebase) {
        //Lager todolist-objektet
        $scope.todoList = $firebase(new Firebase("https://xlib.firebaseio.com/slapp/todo"));
        $scope.arkivList = $firebase(new Firebase("https://xlib.firebaseio.com/slapp/arkiv"));

        //Noen ekle globale variabler
        //TODO: Kan disse variablene fjernes?
        $scope.placeHolder = "Ny matvare";
        $scope.showSave = false;
        $scope.currentId = "";

        //Lytter på enter-knappen i item-feltet
        $scope.hitEnter = function (e) {
            if (e.keyCode != 13) {
                return;
            }
            else if ($scope.showSave == false) {
                $scope.addFood($scope.item);
            }
            else if ($scope.showSave == true) {
                $scope.saveFood();
            }
        }
        //Legg til ny mat
        $scope.addFood = function (matvare) {
            if (matvare != undefined && matvare != "") {
                $scope.todoList.$add({
                    matvare: matvare,
                    isChecked: false,
                })
                $scope.item = "";
                $scope.placeHolder = "Ny matvare";
            }
            else {
                $scope.placeHolder = "Du må skrive noe";
            }
        }
        //Rediger mat
        $scope.editFood = function (id) {
            $scope.item = $scope.todoList[id].matvare
            $scope.showSave = true;
            $scope.currentId = id;
            document.documentElement.scrollTop = document.documentElement.scrollTop = 0;
        }
        //Lagre mat etter redigert
        $scope.saveFood = function () {
            $scope.itemPath = $firebase(new Firebase("https://xlib.firebaseio.com/slapp/todo/" + $scope.currentId));
            if ($scope.item != undefined && $scope.item != "") {
                $scope.itemPath.matvare = $scope.item;
                $scope.itemPath.$save("matvare");
                $scope.currentId = "";
                $scope.item = "";
                $scope.showSave = false;
                $scope.placeHolder = "Ny matvare";
            }
            else {
                $scope.item = $scope.todoList[$scope.currentId].matvare
            }
        }
        //Slett mat
        $scope.deleteFood = function (id) {
            $scope.todoList.$remove(id);

        }
        //Kryss av kjøpte produkter
        $scope.checkItem = function (id) {
            $scope.itemPath = $firebase(new Firebase("https://xlib.firebaseio.com/slapp/todo/" + id));
            if ($scope.todoList[id].isChecked == false) {
                $scope.itemPath.isChecked = true;
            }
            if ($scope.todoList[id].isChecked == true) {
                $scope.itemPath.isChecked = false;
            }
            $scope.itemPath.$save("isChecked");
        }
        $scope.addToArchive = function () {
            var keys = $scope.todoList.$getIndex();
            keys.forEach(function (key, i) {
                if ($scope.todoList[key].isChecked == true) {
                    $scope.arkivList.$add($scope.todoList[key]);
                    $scope.todoList.$remove(key);
                }
            })
        }
        //Lytter på write-to backend og setter id-attr = parent index for å lettere hente ut entries
        $scope.todoList.$on('loaded', function () { //Genialt!!!!
            $scope.todoList.$on('child_added', function (val) {
                $scope.itemPath = $firebase(new Firebase("https://xlib.firebaseio.com/slapp/todo/" + val.snapshot.name));
                $scope.itemPath.id = val.snapshot.name;
                if (val.snapshot.value.matvare != undefined && val.snapshot.value.matvare != "") {//Må bruke snapshot value her.
                    $scope.itemPath.$save("id");
                }
            });
        });
        //lytter på arkivlist
        $scope.arkivList.$on('loaded', function () { //Genialt!!!!
            $scope.arkivList.$on('child_added', function (val) {
                $scope.arkivPath = $firebase(new Firebase("https://xlib.firebaseio.com/slapp/arkiv/" + val.snapshot.name));
                $scope.arkivPath.id = val.snapshot.name;
                if (val.snapshot.value.matvare != undefined && val.snapshot.value.matvare != "") {//Må bruke snapshot value her.
                    $scope.arkivPath.$save("id");
                }
            });
        });
        //Lytter på todoList-objektet og holder getLength oppdatert
        $scope.todoList.$on("change", function () {
            $scope.getLength = $scope.todoList.$getIndex().length
        });
        $scope.arkivList.$on("change", function () {
            $scope.getLengthArkiv = $scope.arkivList.$getIndex().length
        });
    });