(function() {
  angular.module('coffeechat.services.token', ['LocalStorageModule']).constant('TOKEN_KEY', 'token').factory('TokenService', function(TOKEN_KEY, localStorageService, $http, $q) {
    return {
      setup_token: function() {
        var deferred, token;
        deferred = $q.defer();
        token = localStorageService.get(TOKEN_KEY);
        if (!token) {
          $http.post('http://localhost:3000/users').success(function(data, status, headers, config) {
            localStorageService.add(TOKEN_KEY, data.token);
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

}).call(this);
