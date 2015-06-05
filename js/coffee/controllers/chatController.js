(function() {
  angular.module("coffeechat.controllers", ["ionic.service.platform", "ionic.ui.content", "ionic.ui.list", "ionic.service.loading"]).controller("ChatController", function($scope, User) {
    $scope.users = User.all();
  });

}).call(this);
