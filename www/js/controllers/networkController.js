angular.module("coffeechat.controllers.networkController", ['coffeechat.services.network', 'LocalStorageModule']).controller("NetworkController", function($scope, NetworkService, localStorageService, CURRENT_USER_KEY) {
  console.log('NetworkController');
  return NetworkService.createNetwork().then(function(network) {
    var member, myID;
    myID = localStorageService.get(CURRENT_USER_KEY);
    $scope.members = (function() {
      var _i, _len, _ref, _results;
      _ref = network.members;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        member = _ref[_i];
        if (member._id !== myID) {
          _results.push(member);
        }
      }
      return _results;
    })();
    return $scope.networkName = network.name;
  });
});
