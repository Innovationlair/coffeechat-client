angular.module('coffeechat.chat.controllers', [
  'coffeechat.chat.services'
])

.controller('ChatsCtrl', function($scope, Chats, ServerClient, DataStorage, Helpers) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  //$scope.chats = Chats.all();
	$scope.chats = [];

  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
  
  Helpers.getNetworkInfo()
  	.then(function(info){
  		Helpers.getPosition()
  			.then(function(position){
  				
  				ServerClient.createNetwork(
  						info.SSID, 
  						position.coords.latitude, 
  						position.coords.longitude,
  						DataStorage.token)
					.then(function(error){
						console.log(JSON.stringify(error));
					}, function(response){
						var receivedData = JSON.parse(response.responseText);
						var chats = [];
						
						for(var i = 0; i < receivedData.members.length; i++){
							var member = receivedData.members[i];
							chats.push({
								id: member._id,
							    name: member.name,
							    lastText: 'You on your way?',
							    face: member.avatar.replace("\\", "/").replace("\\", "/"),
							    unreadMessages: 1
							});
						}

						for(var i = 0; i < chats.length; i++){
							$scope.chats.push(chats[i]);
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