/* global angular */

(function () {

    var app = angular.module('RVapp');

    app.factory('UserService', ['$q', '$http', '$log', function($q, $http, $log) {

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
                    // In error case, print the message into the log and return the list on the cache
                    $log.error(err);
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
                $log.error(err);
                deferred.reject("Failed to load user.");
            });

            // Return a promise
            return deferred.promise;
        }

        return UserService;

    }]);

})();
