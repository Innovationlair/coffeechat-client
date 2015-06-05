angular.module('coffeechat.services.network-info', [])

.factory 'NetworkInfoService', ($q, $window) ->

  return {
    getNetworkName: ->
      deferred = $q.defer()

      $window.navigator.wifi.getConnectedWifiInfo (data) ->
        deferred.resolve data.SSID
      , (error) ->
        deferred.reject error
      return deferred.promise
  }
