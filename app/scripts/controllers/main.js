'use strict';

angular.module('shoppinglistApp')
  .controller('MainCtrl', function ($scope, $firebase) {
  	//Lager todolist-objektet
    $scope.todoList = $firebase(new Firebase("https://xlib.firebaseio.com/todo"));
    //Statiske variabler
    $scope.placeHolder = "Ny matvare";
    $scope.showSave = false;
    $scope.currentId = "";
    //Funksjon som pusher ny matvare i listen
    $scope.hitEnter = function(e){
      if(e.keyCode != 13){
    		return;
    	}
    	else if($scope.showSave == false){
    		$scope.addFood($scope.item);
    	}
      else if($scope.showSave == true){
        $scope.saveFood();
      }
    }
    $scope.addFood = function(matvare){ 
    	if(matvare != undefined && matvare != ""){
	    	$scope.todoList.$add({
	    		matvare: matvare,
	    		isChecked: false,
	    		})
	    	$scope.item = "";
	    	$scope.placeHolder = "Ny matvare";
    	}
    	else{
    		$scope.placeHolder = "Du må skrive noe";
    	}
    }
    $scope.editFood = function(id){
      $scope.item = $scope.todoList[id].matvare
      $scope.showSave = true;
      $scope.currentId = id;
      document.documentElement.scrollTop = document.documentElement.scrollTop = 0;
    }
    $scope.saveFood = function(){
      $scope.itemPath = $firebase(new Firebase("https://xlib.firebaseio.com/todo/" + $scope.currentId));
      if($scope.item != undefined && $scope.item != ""){
        $scope.itemPath.matvare = $scope.item;
        $scope.itemPath.$save("matvare");
        $scope.currentId = "";
        $scope.item = "";  
        $scope.showSave = false;
      }
      else {
        $scope.item = $scope.todoList[$scope.currentId].matvare
      }
    }

    $scope.deleteFood = function(id){
    	$scope.todoList.$remove(id);
    }
   $scope.todoList.$on('loaded', function () { //Genialt!!!
            $scope.todoList.$on('child_added', function(val) {
            $scope.itemPath = $firebase(new Firebase("https://xlib.firebaseio.com/todo/" + val.snapshot.name));
            $scope.itemPath.id = val.snapshot.name;
            if($scope.itemPath.matvare != undefined){
              $scope.itemPath.$save("id"); 
            }  
			      });
    });
   $scope.todoList.$on("change", function() {
      $scope.getLength = $scope.todoList.$getIndex().length
    });

  	$scope.checkItem = function(id){
  		$scope.itemPath = $firebase(new Firebase("https://xlib.firebaseio.com/todo/" + id));
	  		if($scope.todoList[id].isChecked == false){
	  			$scope.itemPath.isChecked = true;	
	  		}
	  		if($scope.todoList[id].isChecked == true){
	  			$scope.itemPath.isChecked = false;	
	  		}
  		$scope.itemPath.$save("isChecked");
  	}
  });
