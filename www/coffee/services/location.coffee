angular.module('coffeechat.services.location', [])

.factory 'LocationService', ($q, $window) ->

  return {
    getLocation: ->
      deferred = $q.defer()

      $window.navigator.geolocation.getCurrentPosition (position) ->
        deferred.resolve(position)
      ,(error) ->
         deferred.reject(error)

      return deferred.promise
  }
