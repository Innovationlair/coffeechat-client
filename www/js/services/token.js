angular.module('coffeechat.services.token', ['coffeechat.constants', 'LocalStorageModule']).factory('TokenService', function(BASE_URL, TOKEN_KEY, CURRENT_USER_KEY, localStorageService, $http, $q) {
  return {
    setup_token: function() {
      var deferred, token;
      deferred = $q.defer();
      token = localStorageService.get(TOKEN_KEY);
      if (!token) {
        $http.post("" + BASE_URL + "/users").success(function(data, status, headers, config) {
          localStorageService.add(TOKEN_KEY, data.token);
          localStorageService.add(CURRENT_USER_KEY, data._id);
          $http.defaults.headers.common.Authorization = data.token;
          return deferred.resolve(data.token);
        });
      } else {
        $http.defaults.headers.common.Authorization = token;
        deferred.resolve(token);
      }
      return deferred.promise;
    }
  };
});
