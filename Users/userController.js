/* global angular */

(function () {

    var app = angular.module('RVapp');

    // Define the User controller
    app.controller('UserController', [ '$http', '$scope', 'UserService', '$routeParams',
    function($http, $scope, UserService, $routeParams)
    {
        $scope.isLoading = true;
        $scope.users = [];
        $scope.userID = $routeParams.userID;

        // If the ID is not defined, load the whole list
        if ($scope.userID == undefined) {
            UserService.LoadUsers().then(function(users) {
                $scope.isLoading = false;
                $scope.users = users;
            });
        }
        else {
            // Otherwise, load just the selected widget
            UserService.LoadUserByID($scope.userID).then(
                function(user) {
                    $scope.users.push(user);
                    $scope.isLoading = false;
                },
                function() {
                    alert("Failed to load user.");
                    $scope.isLoading = false;
                }
            );
        }
    }]);

})();
