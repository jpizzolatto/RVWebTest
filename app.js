/* global angular */

(function () {

	var app = angular.module('RVapp', ['ngRoute']);

	// Define the routers
	app.config(function($routeProvider) {
		$routeProvider
		.when('/', {
			controller: 'DashboardController',
      		templateUrl:'Dashboard/dashboard.html',
    	})
		.when('/user', {
			controller:'UserController',
      		templateUrl:'Users/user.html',
    	})
		.when('/user/:userID', {
			controller:'UserController',
      		templateUrl:'Users/user.html',
    	})
		.when('/widget', {
			controller:'WidgetController',
      		templateUrl:'Widgets/widget.html',
    	})
		.when('/widget/:widgetID', {
			controller:'WidgetController',
      		templateUrl:'Widgets/widget.html',
    	})
		.otherwise({
      		redirectTo:'/'
    	});
	});

})();
