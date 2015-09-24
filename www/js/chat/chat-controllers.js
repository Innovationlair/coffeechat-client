angular.module('coffeechat.chat.controllers', [
  'coffeechat.chat.services',
  'coffeechat.user.services'
])

.controller('ChatsCtrl', function($scope, Chats, ServerClient, DataStorage, Helpers, User) {
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
  
  Helpers.getNetworkInfo()
  	.then(function(info){
  		Helpers.getPosition()
  			.then(function(position){
				console.log("SSIS: " + info.SSID);
  				ServerClient.createNetwork(
  						info.SSID.replace('"', '').replace('"', ''), 
  						position.coords.latitude, 
  						position.coords.longitude,
  						DataStorage.token)
					.then(function(error){
						console.log(JSON.stringify(error));
					}, function(response){
						var receivedData = JSON.parse(response.responseText);
						for(var i = 0; i < receivedData.members.length; i++){
							var member = receivedData.members[i];
							Chats.addChat({
								id: member._id,
							    name: member.name,
							    lastText: 'You on your way?',
							    face: member.avatar.replace("\\", "/").replace("\\", "/"),
							    unreadMessages: 1
							});
							
							User.addUser({
								_id: member._id,
							    name: {first: member.name, last: ''},
							    pic: member.avatar.replace("\\", "/").replace("\\", "/")
							});
						}
						
						$scope.$apply();
				});
  				
  			}, function(error){
  		  		console.log("Error" + JSON.stringify(error));
  			});
  	}, function(error){
  		console.log("Error" + JSON.stringify(error));
  	})
});