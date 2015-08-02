/* global angular */

(function () {

    var app = angular.module('RVapp');

    // Define the User controller
    app.controller('DashboardController', ['$scope', '$http', 'UserService', 'WidgetService',
    function($scope, $http, UserService, WidgetService) {

        $scope.users;
        $scope.widgets;

        // Load users from service
        getUsers();
        
        // Load widgets from service
        getWidgets();

        function getUsers() {
            UserService.LoadUsers().then(function(users) {
                $scope.users = users;
            });
        };

        function getWidgets() {
            WidgetService.LoadWidgets().then(function(widgets) {
                $scope.widgets = widgets;
            });
        }
    }]);

})();
