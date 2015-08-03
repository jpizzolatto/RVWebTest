/* global angular */

(function () {

    var app = angular.module('RVapp');

    app.factory('WidgetService', ['$q', '$http', function($q, $http) {

        var widgetList = [];
        var WidgetService = {};

        WidgetService.LoadWidgets = function(forceLoad) {
            var deferred = $q.defer();

            if (widgetList.length == 0 || forceLoad) {

                 $http.get('http://spa.tglrw.com:4000/widgets').success(function(data) {
                     // fill the local array and resolve with the properly array to caller
                     widgetList = data;
                     deferred.resolve(data);
                 })
                 .error(function(err) {
                     // In error case, print the message into the log and return the empty list
                     console.log(err);
                     deferred.resolve(widgetList);
                 });

                // Return a promise
                 return deferred.promise;
             }
             else {
                 // In case of the list already been loaded, just return it
                 deferred.resolve(widgetList);
                 return deferred.promise;
             }
            return
        }

        WidgetService.LoadWidgetByID = function(id) {
            var deferred = $q.defer();

            $http.get('http://spa.tglrw.com:4000/widgets/' + id, {"id" : id}).success(function(data) {
                // fill the local array and resolve with the properly array to caller
                deferred.resolve(data);
            })
            .error(function(err) {
                // In error case, print the message into the log and reject the promise
                console.log(err);
                deferred.reject();
            });

           // Return a promise
            return deferred.promise;
        }

        WidgetService.AddWidget = function(widget) {
            var deferred = $q.defer();

            // Send a POST message to add a new Widget element
            $http.post('http://spa.tglrw.com:4000/widgets', widget)
            .success(function(response) {
                // In success case, add the element into the local array and resolve the promise
                deferred.resolve();
            })
            .error(function(err) {
                // In error case, reject the promise
                console.log(err);
                deferred.reject();
            });

            // Return a promise
            return deferred.promise;
        }

        WidgetService.UpdateWidget = function(id, widget) {
            var deferred = $q.defer();

            // Send a POST message to add a new Widget element
            $http.put('http://spa.tglrw.com:4000/widgets/' + id, widget)
            .success(function(response) {
                // In success case, add the element into the local array and resolve the promise
                deferred.resolve();
            })
            .error(function(err) {
                // In error case, reject the promise
                console.log(err);
                deferred.reject();
            });

            // Return a promise
            return deferred.promise;
        }

        return WidgetService;

    }]);

})();
