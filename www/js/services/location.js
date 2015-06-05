angular.module('coffeechat.services.location', []).factory('LocationService', function($q, $window) {
  return {
    getLocation: function() {
      var deferred;
      deferred = $q.defer();
      $window.navigator.geolocation.getCurrentPosition(function(position) {
        return deferred.resolve(position);
      }, function(error) {
        return deferred.reject(error);
      });
      return deferred.promise;
    }
  };
});
