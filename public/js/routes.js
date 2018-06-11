var smartfare = angular.module('SmartFare', ['ng', 'ngRoute']);

smartfare.config(function($routeProvider) {
    $routeProvider.
        when('/admin/events', {
        	templateUrl: 'views/tripsView.html',
            controller: 'tripsTableController'
        }).
        when('/admin/vehicles', {
        	templateUrl: 'views/vehiclesView.html',
            controller: 'vehiclesTableController'
        });
});
