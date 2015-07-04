angular.module('starter.controllers', [
  'coffeechat.user.services'
])

.controller('MainCtrl', function($scope, User) {
  $scope.online = true;

  $scope.currentUser = User.me;
})

// .controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
//   $scope.chat = Chats.get($stateParams.chatId);
// })

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});