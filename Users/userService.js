/* global angular */

(function () {

    var app = angular.module('RVapp');

    app.factory('UserService', ['$q', '$http', function($q, $http) {

        var userList = [];
        var UserService = {};

        UserService.LoadUsers = function() {
            var deferred = $q.defer();

            if (userList.length == 0) {

                $http.get('http://spa.tglrw.com:4000/users').success(function(data) {
                    // fill the local array and resolve with the properly array to caller
                    userList = data;
                    deferred.resolve(data);
                })
                .error(function(err) {
                    // In error case, print the message into the log and return the empty list
                    console.log(err);
                    deferred.resolve(userList);
                });

                // Return a promise
                return deferred.promise;
            }
            else {
                // In case of the list already been loaded, just return it
                deferred.resolve(userList);
                return deferred.promise;
            }
        }

        UserService.LoadUserByID = function(id) {
            var deferred = $q.defer();

            $http.get('http://spa.tglrw.com:4000/users/' + id, {"id" : id}).success(function(data) {
                // fill the local array and resolve with the properly array to caller
                deferred.resolve(data);
            })
            .error(function(err) {
                // In error case, print the message into the log and return the empty list
                console.log(err);
                deferred.resolve(null);
            });

            // Return a promise
            return deferred.promise;
        }

        return UserService;

    }]);

})();
