angular.module('coffeechat.services.network', ['coffeechat.constants', 'coffeechat.services.location', 'coffeechat.services.network-info']).factory('NetworkService', function(BASE_URL, $http, $q, LocationService, NetworkInfoService) {
  return {
    createNetwork: function() {
      var deferred, location, networkName;
      deferred = $q.defer();
      networkName = NetworkInfoService.getNetworkName();
      location = LocationService.getLocation();
      $q.all([networkName, location]).then(function(arrayOfResults) {
        var SSID, params, position;
        SSID = arrayOfResults[0], position = arrayOfResults[1];
        params = {
          name: SSID,
          lat: position.coords.latitude,
          lon: position.coords.longitude
        };
        return $http.post("" + BASE_URL + "/networks", params).success(function(network) {
          return deferred.resolve(network);
        }).error(function(error) {
          return deferred.reject(error);
        });
      });
      return deferred.promise;
    },
    list: function() {
      var deferred;
      deferred = $q.defer();
      LocationService.getLocation().then(function(location) {
        var params;
        params = {
          lat: location.coords.latitude,
          lon: location.coords.longitude
        };
        return $http.get("" + BASE_URL + "/networks", {
          params: params
        }).success(function(networks) {
          return deferred.resolve(networks);
        }).error(function(error) {
          return deferred.reject(error);
        });
      });
      return deferred.promise;
    }
  };
});
