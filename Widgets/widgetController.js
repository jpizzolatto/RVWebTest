/* global angular */

(function () {

    var app = angular.module('RVapp');

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
	}]);

})();
