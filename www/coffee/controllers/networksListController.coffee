angular.module("coffeechat.controllers.networksListController", ['coffeechat.services.network'])

.controller "NetworksListController", ($scope, NetworkService) ->
  NetworkService.list().then (networks) ->
    $scope.networks = networks
