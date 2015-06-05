angular.module("coffeechat.controllers.networksListController", ['coffeechat.services.network']).controller("NetworksListController", function($scope, NetworkService) {
  return NetworkService.list().then(function(networks) {
    return $scope.networks = networks;
  });
});
