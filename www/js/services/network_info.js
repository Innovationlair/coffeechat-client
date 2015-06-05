angular.module('coffeechat.services.network-info', []).factory('NetworkInfoService', function($q, $window) {
  return {
    getNetworkName: function() {
      var deferred;
      deferred = $q.defer();
      $window.navigator.wifi.getConnectedWifiInfo(function(data) {
        return deferred.resolve(data.SSID);
      }, function(error) {
        return deferred.reject(error);
      });
      return deferred.promise;
    }
  };
});
