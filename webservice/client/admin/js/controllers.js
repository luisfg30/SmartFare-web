var smartfare = angular.module('SmartFare', ['ng', 'ngRoute']);

smartfare.controller('nameController', function($scope) {});

smartfare.controller('tripsTableController', function($scope, $http) {
    $http.get('/trips').success(function(data) {
        $scope.trips = data;
        console.log(data);
    });
});