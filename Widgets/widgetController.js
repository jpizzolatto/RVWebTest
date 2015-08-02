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
            WidgetService.LoadWidgetByID(id).then(function(_widget) {
                // Copy the widget element to selected (for edition purpose)
                $scope.selWidget = angular.copy(_widget);

                // Set just one element on array to show
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

        // Method to properly initialize the list
        function Initialize() {
            // If the ID is not defined, load the whole list
            if ($scope.widgetID == undefined) {
                $scope.LoadWidgetList($scope.forceUpload);
                $scope.forceUpload = false;
            }
            else {
                // Otherwise, load just the selected widget
                $scope.LoadWidget($scope.widgetID);
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

            // Construct the JSON element
            var widgetJSON = ConstructWidgetJSON(widget);

            // Call the Add Widget method from service passing the JSON element
            WidgetService.AddWidget(widgetJSON).then(function(result) {
                if (result == true) {
                    // Force update the list to show the new item
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

            // Call the Update Widget method from service passing the JSON element
            WidgetService.UpdateWidget(widget.id, widgetJSON).then(function(result) {
                if (result == true) {
                    // Load the updated element to show for user
                    $scope.LoadWidget(widget.id);
                    // Force to update the whole list for the next time
                    $scope.forceUpload = true;
                }
                else {
                    alert("Failed to edit the widget!");
                }
            });
        }

	}]);

})();
