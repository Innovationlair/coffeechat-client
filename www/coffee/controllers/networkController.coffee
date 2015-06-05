angular.module("coffeechat.controllers.networkController", ['coffeechat.services.network',
                                                            'LocalStorageModule'])

.controller "NetworkController", ($scope, NetworkService, localStorageService, CURRENT_USER_KEY) ->
  console.log 'NetworkController'
  NetworkService.createNetwork().then (network) ->
    myID = localStorageService.get(CURRENT_USER_KEY)
    $scope.members = (member for member in network.members when member._id != myID)
    $scope.networkName = network.name
