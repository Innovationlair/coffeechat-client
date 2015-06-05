(function() {
  angular.module('coffeechat.services.network', ['coffeechat.services.location', 'coffeechat.services.network-info']).factory('NetworkService', function($http, $q, LocationService, NetworkInfoService) {
    return {
      createNetwork: function() {
        var deferred, location, networkName;
        deferred = $q.defer();
        networkName = NetworkInfoService.getNetworkName();
        location = LocationService.getLocation();
        $q.all([networkName, location]).then(function(arrayOfResults) {
          console.log(arrayOfResults);
          return $http.post('http://localhost:3000/networks').success(function(network) {
            console.log(network);
            return deferred.resolve(network);
          }).error(function(error) {
            return deferred.reject(error);
          });
        });
        return deferred.promise;
      }
    };
  });

}).call(this);
