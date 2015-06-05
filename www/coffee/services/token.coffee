angular.module('coffeechat.services.token', ['coffeechat.constants', 'LocalStorageModule'])

.factory 'TokenService', (BASE_URL, TOKEN_KEY, CURRENT_USER_KEY, localStorageService, $http, $q) ->

  return {
    setup_token: ->
      deferred = $q.defer()
      token = localStorageService.get(TOKEN_KEY)
      if not token
        $http.post("#{BASE_URL}/users").success (data, status, headers, config) ->
          # Store in local storage
          localStorageService.add(TOKEN_KEY, data.token)
          localStorageService.add(CURRENT_USER_KEY, data._id)

          # Set header
          $http.defaults.headers.common.Authorization = data.token
          deferred.resolve(data.token)
      else
        # Set header
        $http.defaults.headers.common.Authorization = token
        deferred.resolve(token)

      return deferred.promise
  }
