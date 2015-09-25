angular.module('starter.controllers',
		[ 'coffeechat.user.services', 'coffeechat.common-services' ])

.controller('MainCtrl', function($scope, User) {
	$scope.online = true;

	$scope.currentUser = User.me;
})

// .controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
// $scope.chat = Chats.get($stateParams.chatId);
// })

.controller('AccountCtrl', function($scope) {
	$scope.settings = {
		enableFriends : true
	};
})

.controller('LookAroundCtrl', function($scope, ImageFilePicker, ServerClient, DataStorage) {
	if (!DataStorage.getToken()) {
		ImageFilePicker.pickImage().then(
				function(result) {
					ImageFilePicker.uploadImage(result.data)
						.then(function(imgUrl) {
								ServerClient.createUser("sony11", imgUrl)
									.then(function(error) {
										console.log("Error: " + JSON.stringify(error));
									}, function(response){
										var userData = JSON.parse(response.responseText);
										console.log("Received data: " + JSON.stringify(userData));
										DataStorage.setToken(userData.token);
										DataStorage.setUserId(userData._id);
										DataStorage.setUsername(userData.name);
										DataStorage.setAvatar(userData.avatar);
								
										ServerClient.connectToServer(userData._id);
									});
						},
						function(error) {
							console.log("Error: " + JSON.stringify(error));
						});
					
				}, function(error) {
					console.log("Error: " + JSON.stringify(error));
				});
	} else {
		ServerClient.connectToServer(DataStorage.getUserId());
	}	
});