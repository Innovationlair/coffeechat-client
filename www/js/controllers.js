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
	$scope.user = {
		username : ""
	};

	$scope.pickImage = function() {

		ImageFilePicker.pickImage().then(
				function(result) {
					ServerClient.createUser(result.file, result.data,
							$scope.user.username).then(function(data) {

						// console.log("Success: " +
						// JSON.stringify(data));
						DataStorage.token = data.token;
						DataStorage.setToken(data.token);
						DataStorage.setUserId(data._id);
						DataStorage.name = data.name;
						DataStorage.userId = data._id;
					}, function(error) {
						console.log("Error: " + JSON.stringify(error));
					});
	
				}, function(error) {
					console.log("Error: " + JSON.stringify(error));
				});
	};
	
	DataStorage.token = DataStorage.getToken();
});