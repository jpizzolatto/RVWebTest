/* global angular */

(function () {

    var app = angular.module('RVapp');

    // Define the User controller
    app.controller('UserController', [ '$http', '$scope', 'UserService', '$routeParams',
    function($http, $scope, UserService, $routeParams)
    {
        $scope.users = [];
        $scope.userID = $routeParams.userID;

        if ($scope.userID == undefined) {
            UserService.LoadUsers().then(function(users) {
                $scope.users = users;
            });
        }
        else {
            UserService.LoadUserByID($scope.userID).then(function(user) {
                $scope.users.push(user);
            });
        }
    }]);

})();
