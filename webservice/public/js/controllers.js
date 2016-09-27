var smartfare = angular.module('SmartFare', ['ng', 'ngRoute']);

smartfare.controller('tripsTableController', function($scope, $http) {
    $http.get('/trips').success(function(data) {
        $scope.trips = data;
        console.log(data);
    });
});


/*
smartfare.controller('nameController', function($scope) {});

<div ng-controller="nameController">
	<label>Nome: </label>
	<input type="text" ng-model="myName">
	<h4>Olá {{myName}}</h4>
</div>
*/