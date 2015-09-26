angular.module('coffeechat.chat.controllers', [
  'coffeechat.chat.services',
  'coffeechat.user.services'
])

.controller('ChatsCtrl', function($scope, $interval, Chats, ServerClient, DataStorage, Helpers, User) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

    $scope.chats = Chats.all();
	//$scope.chats = [];

  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
  
  $scope.wifiInfo = {};
  $scope.position = {};
  $scope.memberMap = {};
	
	$scope.onUsersReceived = function(response){
		var receivedData = JSON.parse(response.responseText);
		for(var i = 0; i < receivedData.members.length; i++){
			var member = receivedData.members[i];
			
			if(member._id != DataStorage.getUserId()){		
				if(!$scope.memberMap[member._id]){
					$scope.memberMap[member._id] = true;
					Chats.addChat({
						id: member._id,
						name: member.name,
						lastText: '',
						profilePic: member.avatar,
						unreadMessages: 0
					});
					
					User.addUser({
						_id: member._id,
						name: {first: member.name, last: ''},
						pic: member.avatar
					});
				}
			}
		}
		
		$scope.$apply();

	};
	
	
	$scope.onError = function(error){
		console.log("Error" + JSON.stringify(error));
	};
	
	Helpers.getNetworkInfo()
  	.then(function(info){
		$scope.wifiInfo = info;
  		return Helpers.getPosition();
  			
	}, $scope.onError)
	.then(function(position){
		$scope.position.lat = position.coords.latitude;
		$scope.position.lon = position.coords.longitude;
		
		var getUsers = function(){
			ServerClient.createNetwork(
  						$scope.wifiInfo.SSID.replace('"', '').replace('"', ''), 
  						$scope.position.lat, 
  						$scope.position.lon,
  						DataStorage.getToken())
			.then($scope.onError, $scope.onUsersReceived);
		};
		
		getUsers();
		
		$interval(getUsers, 5000);
	}, $scope.onError);
});