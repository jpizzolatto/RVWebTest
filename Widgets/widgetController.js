/* global angular */

(function () {

    var app = angular.module('RVapp');

    app.directive('createWidget', function() {
		return {
			restrict: 'E', // E -> Represent an Element
			templateUrl: 'Widgets/createWidget.html'
		};
	});

    app.directive('editWidget', function() {
		return {
			restrict: 'E', // E -> Represent an Element
			templateUrl: 'Widgets/editWidget.html'
		};
	});

    // Define the Widgets controller
	app.controller('WidgetController', [ '$http', '$scope', 'WidgetService', '$routeParams',
    function($http, $scope, WidgetService, $routeParams)
	{
        // Control variabled
        $scope.forceUpload = false;
        $scope.addNewClicked = false;
        $scope.editClicked = false;
        // Value variables
        $scope.widgets = [];
        $scope.widgetID = $routeParams.widgetID;
        $scope.selWidget;

        $scope.LoadWidget = function(id) {
            WidgetService.LoadWidgetByID($scope.widgetID).then(function(_widget) {
                $scope.selWidget = angular.copy(_widget);

                // Set just one element on array
                $scope.widgets = [];
                $scope.widgets.push(_widget);
            });
        }

        $scope.LoadWidgetList = function(forceLoad) {
            WidgetService.LoadWidgets(forceLoad).then(function(_widgets) {
                $scope.widgets = _widgets;
            });
        }

        Initialize();

        function Initialize() {
            if ($scope.widgetID == undefined) {
                $scope.LoadWidgetList($scope.forceUpload);
                $scope.forceUpload = false;
            }
            else {
                $scope.LoadWidget();
            }
        }

        function ConstructWidgetJSON(widget) {

            var widgetJSON =
			{
				"name" : widget.name,
				"color" : widget.color,
                "price" : widget.price,
                "inventory" : widget.inventory,
                "melts" : widget.melts == undefined? false : widget.melts,
			};

            return widgetJSON;
        }

        $scope.AddWidget = function(widget) {
            $scope.addNewClicked = false;

            var widgetJSON = ConstructWidgetJSON(widget);

            WidgetService.AddWidget(widgetJSON).then(function(result) {
                if (result == true) {
                    $scope.LoadWidgetList(true);
                }
                else {
                    alert("Failed to add a new widget!");
                }
            });
        }

        $scope.EditWidget = function(widget) {
            $scope.editClicked = false;

            var widgetJSON = ConstructWidgetJSON(widget);

            WidgetService.UpdateWidget(widget.id, widgetJSON).then(function(result) {
                if (result == true) {
                    $scope.LoadWidget(widget.id);
                    $scope.forceUpload = true;
                }
                else {
                    alert("Failed to edit the widget!");
                }
            });
        }

	}]);

})();
