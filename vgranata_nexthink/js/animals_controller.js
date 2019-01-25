'use strict';
var app = angular.module('animals',['ui.bootstrap','ngRoute']);

app.config(function($routeProvider) {
  $routeProvider
  .when("/", {
    templateUrl : "pets.html"
  })
  .when("/add_pet", {
    templateUrl : "add_pet.html"
  })
  .otherwise({ redirectTo: '/' });
});

app.controller('animalsCtrl', ['$scope', '$http', '$window', '$filter', '$location',
function($scope,$http,$window,$filter,$location) {
	
	$scope.global_list = [
		{"type":"dog", "diet":"bones, chicken, fish", "cry":"bark", "feature":"run"},
		{"type":"cat", "diet":"fish", "cry":"mew" , "feature":"jump"},
		{"type":"fish", "diet":"flakes, granules or pellets", "cry":"N/A", "feature":"swim"},
		{"type":"bird", "diet":"seeds", "cry":"tweet", "feature":"fly"}
		];
	
	$scope.specific_list = [
		{"id":1,"type":"dog","name":"Max","age":3},
		{"id":2,"type":"dog","name":"Charlie","age":1},
		{"id":3,"type":"dog","name":"Buddy","age":2},
		{"id":4,"type":"cat","name":"Missy","age":3},
		{"id":5,"type":"cat","name":"Molly","age":4},
		{"id":6,"type":"cat","name":"Tiger","age":5},
		{"id":7,"type":"cat","name":"Smokey","age":6},
		{"id":8,"type":"bird","name":"McFly","age":1},
		{"id":9,"type":"bird","name":"Tweety","age":2},
		{"id":10,"type":"bird","name":"Flapper","age":3}
		];
	
	$scope.animal_type;
	$scope.animal_specific_infos;
	$scope.new_pet = {};
	//----------------------------------------------------------------------------//
	// ANIMAL TYPE & INFORMATION for selected animal type
	//----------------------------------------------------------------------------//
	$scope.passType = function(index) {
		
		$scope.animal_type = $scope.global_list[index].type;
		$scope.get_specific_info($scope.animal_type);
		
	};
	//----------------------------------------------------------------------------//
	// GET INFORMATION for selected animal type
	//----------------------------------------------------------------------------//
	$scope.get_specific_info = function(animal_type) {
		
		var result = $scope.specific_list.filter(obj => {
			  return obj.type === animal_type
		})
		if(result[0]) {
			$scope.animal_specifc_infos=result;
		} 
		
	};
	//----------------------------------------------------------------------------//
	// GET NUMBER OF ANIMALS for selected animal type
	//----------------------------------------------------------------------------//
	$scope.get_nanimals = function(animal_type) {
		
		var result = $scope.specific_list.filter(obj => {
			return obj.type === animal_type
		});
			
		if(Object.keys(result).length) {
			return Object.keys(result).length;
		} else {
			return 0;
		}
		
	};
	//----------------------------------------------------------------------------//
	// ADD PET
	//----------------------------------------------------------------------------//
	$scope.add_pet = function() { 
		
		var id = Math.max.apply(null,$scope.specific_list.map(function(e) { return e.id; })) + 1;
		$scope.specific_list.push({"id":id,"type":$scope.animal_type,"name":$scope.new_pet.pet_name,"age":$scope.new_pet.pet_age});
		$scope.animal_type=undefined;
		$scope.new_pet.pet_name="";
		$scope.new_pet.pet_age="";
		
	};
	//----------------------------------------------------------------------------//
	// REMOVE PET
	//----------------------------------------------------------------------------//
	$scope.remove_pet = function($index) {
		var pet = $scope.animal_specifc_infos[$index];
		
		var index = -1;
		var id = pet.id;
		var type = pet.type;
		
		if(id > -1){
			index = $scope.specific_list.map(function(e) { return e.id; }).indexOf(id);
		
			if(index > -1){
				$scope.specific_list.splice(index,1);
			}
		}
		
		if(type!=undefined){
			$scope.get_specific_info(type);
			$scope.get_nanimals(type);
		}
		
	};
}]);