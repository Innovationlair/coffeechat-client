(function() {
  angular.module("coffeechat", ['coffeechat.services.token', 'coffeechat.services.network', 'ionic']).run(function($ionicPlatform, $window, TokenService, NetworkService) {
    return $ionicPlatform.ready(function() {
      return TokenService.setup_token().then(function(token) {
        console.log(token);
        switch ($window.navigator.network.connection.type) {
          case Connection.WIFI:
            return NetworkService.createNetwork().then(function(network) {
              return console.log(network);
            });
          case Connection.CELL_2G:
          case Connection.CELL_3G:
          case Connection.CELL_4G:
          case Connection.CELL:
            return console.log('3G');
          default:
            return console.log('No internet');
        }
      });
    });
  });

}).call(this);
