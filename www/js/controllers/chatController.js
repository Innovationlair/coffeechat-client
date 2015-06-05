angular.module('coffeechat.controllers.chatController', ['coffeechat.services.socket', 'ionic']).controller('ChatController', function($scope, $ionicScrollDelegate, $rootScope, $stateParams, socket) {
  return $scope.add = function() {
    socket.emit('message', {
      body: 'Blabla',
      recipientId: $stateParams.memberId
    });
    $scope.messages.push(angular.extend({}, 'Blabla'));
    return $ionicScrollDelegate.scrollBottom(true);
  };
});
