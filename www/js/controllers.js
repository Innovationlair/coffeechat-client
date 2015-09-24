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
					ServerClient.createUser(result.file, result.data,
							"misho2").then(function(data) {
						// console.log("Success: " +
						// JSON.stringify(data));
						DataStorage.token = data.token;
						DataStorage.setToken(data.token);
					}, function(error) {
						console.log("Error: " + JSON.stringify(errir));
					});
	
				}, function(error) {
					console.log("Error: " + JSON.stringify(error));
				});
	} else {
		DataStorage.token = DataStorage.getToken();
	}
});