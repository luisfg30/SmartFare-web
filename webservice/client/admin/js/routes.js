var smartfare = angular.module('SmartFare', ['ng', 'ngRoute']);

smartfare.config(function($routeProvider) {
    $routeProvider.
        when('/admin/trips', {
        	template: '';
        }).
        when('/admin/vehicles', {
        	template: '';
        });
});