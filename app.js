/* global angular */

(function () {

	var app = angular.module('RVapp', ['ngRoute']);

	// Define the routers
	app.config(function($routeProvider) {
		$routeProvider
		.when('/', {
			// Check which controller I need to use here
      		templateUrl:'dashboard.html',
    	})
		.when('/user', {
			controller:'UserController as userCtrl',
      		templateUrl:'user.html',
    	})
		.when('/widget', {
			controller:'WidgetController as widgetCtrl',
      		templateUrl:'widget.html',
    	})
		.otherwise({
      		redirectTo:'/'
    	});
	});

	// Define the User controller
	app.controller('UserController', [ '$http', '$scope', function($http, $scope)
	{
		// Check methods, factory and if I need to export something to another controller
		$scope.loadUser = function()
		{
			$http.get('http://spa.tglrw.com:4000/users').
			success(function(data) {
	            $scope.users = data;
			});
		};
	}
	]);

	// Define the Widgets controller
	app.controller('WidgetController', [ '$http', '$scope', function($http, $scope)
	{
		// Check methods, factory and if I need to export something to another controller
		$scope.loadWidgets = function()
		{
			$http.get('http://spa.tglrw.com:4000/widgets').
			success(function(data) {
	            $scope.widgets = data;
			});
		};
	}
	]);

})();
