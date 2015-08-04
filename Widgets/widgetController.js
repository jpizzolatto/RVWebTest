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
        // Defines the scope variables
        angular.extend($scope, {
            // Control variables
            isLoading: false,
            addNewClicked: false,
            editClicked: false,

            // Values variables
            widgets: [],
            widgetID: $routeParams.widgetID,
            selWidget: null
        });

        $scope.LoadWidget = function(id) {
            $scope.isLoading = true;
            WidgetService.LoadWidgetByID(id).then(
                // Success function
                function(_widget) {
                    $scope.isLoading = false;
                    // Copy the widget element to selected (for edition purpose)
                    $scope.selWidget = angular.copy(_widget);

                    // Set just one element on array to show
                    $scope.widgets = [];
                    $scope.widgets.push(_widget);
                },
                // Error function
                function() {
                    $scope.isLoading = false;
                    alert("Failed to load the widget.");
                }
            );
        }

        $scope.LoadWidgetList = function() {
            $scope.isLoading = true;
            WidgetService.LoadWidgets().then(function(_widgets) {
                $scope.isLoading = false;
                $scope.widgets = _widgets;
            });
        }

        Initialize();

        // Method to properly initialize the list
        function Initialize() {
            // If the ID is not defined, load the whole list
            if ($scope.widgetID == undefined) {
                $scope.LoadWidgetList();
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
            $scope.isLoading = true;
            $scope.addNewClicked = false;

            // Construct the JSON element
            var widgetJSON = ConstructWidgetJSON(widget);

            // Call the Add Widget method from service passing the JSON element
            WidgetService.AddWidget(widgetJSON).then(
                // Success function
                function() {
                    // Set newWidget to null to reset the form
                    $scope.newWidget = null;
                    // Force update the list to show the new item
                    $scope.LoadWidgetList();
                },
                // Error function
                function(reason) {
                    $scope.isLoading = false;
                    alert(reason);
                }
            );
        }

        $scope.EditWidget = function(widget) {
            $scope.isLoading = true;
            $scope.editClicked = false;

            var widgetJSON = ConstructWidgetJSON(widget);

            // Call the Update Widget method from service passing the JSON element
            WidgetService.UpdateWidget(widget.id, widgetJSON).then(
                // Success function
                function() {
                    // Load the updated element to show for user
                    $scope.LoadWidget(widget.id);
                },
                // Error function
                function(reason) {
                    $scope.isLoading = false;
                    alert(reason);
                }
            );
        }

        // Method to reverse order of the list when click on ID column
        $scope.reverseOrder = function() {
            if ($scope.filter.reverse === '') {
                $scope.filter.reverse = 'reverse';
            }
            else {
                $scope.filter.reverse = '';
            }
        }

	}]);

})();
