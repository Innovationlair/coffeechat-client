angular.module('coffeechat.services.network', ['coffeechat.constants',
                                               'coffeechat.services.location',
                                               'coffeechat.services.network-info'])

.factory 'NetworkService', (BASE_URL, $http, $q, LocationService, NetworkInfoService) ->

  return {
    createNetwork: ->
      deferred = $q.defer()
      
      networkName = NetworkInfoService.getNetworkName()
      location = LocationService.getLocation()
      $q.all([
        networkName,
        location]).then (arrayOfResults) ->
          [SSID, position] = arrayOfResults
          params =
            name: SSID,
            lat: position.coords.latitude,
            lon: position.coords.longitude
          $http.post("#{BASE_URL}/networks", params).success (network) ->
            deferred.resolve network
          .error (error) ->
            deferred.reject error

      return deferred.promise

    list: ->
      deferred = $q.defer()

      LocationService.getLocation().then (location) ->
        params =
          lat: location.coords.latitude,
          lon: location.coords.longitude
        $http.get("#{BASE_URL}/networks", params: params).success (networks) ->
          deferred.resolve(networks)
        .error (error) ->
          deferred.reject error

      return deferred.promise
  }
