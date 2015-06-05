angular.module("coffeechat", ['coffeechat.services.token', 'coffeechat.services.socket', 'coffeechat.controllers.networkController', 'coffeechat.controllers.networksListController', 'coffeechat.controllers.chatController', 'ionic']).config(function($stateProvider, $urlRouterProvider) {
  console.log('CoffeeChat configured!');
  return $stateProvider.state('network', {
    url: '/network',
    templateUrl: 'templates/members-list.html',
    controller: 'NetworkController'
  }).state('networks', {
    url: '/networks',
    templateUrl: 'templates/networks-list.html',
    controller: 'NetworksListController'
  }).state('chat', {
    url: '/chatwith/:memberId',
    templateUrl: 'templates/chat.html',
    controller: 'ChatController'
  });
}).run(function($ionicPlatform, $window, TokenService, $state, socket) {
  return $ionicPlatform.ready(function() {
    console.log('Device ready');
    return TokenService.setup_token().then(function(token) {
      console.log(token);
      socket.on('connect', function() {
        return socket.emit('register', token);
      });
      socket.on('message', function(data) {
        return console.log('Received:', data);
      });
      switch ($window.navigator.network.connection.type) {
        case Connection.WIFI:
          return $state.go('network');
        case Connection.CELL_2G:
        case Connection.CELL_3G:
        case Connection.CELL_4G:
        case Connection.CELL:
          return $state.go('networks');
        default:
          return console.log('No internet');
      }
    });
  });
});
