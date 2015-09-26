angular.module('coffeechat.common-services', [])

.service('ImageFilePicker', function($q) {
	
	// Gets an image from the file system
	// returns a promise
	// in the success handler, the result is as follows:
	// - data - the binary content of the image
	// - file - the image metadata (type, name, etc)
	this.pickImage = function() {
		var deferred = $q.defer();

		var options = {
			maximumImagesCount : 1,
			width : 800,
			height : 800,
			quality : 50
		};

		if (window.imagePicker) {
			window.imagePicker.getPictures(function(results) {
				var selected = results[0];

				window.resolveLocalFileSystemURL(selected, function(data) {
					data.file(function(file) {
						var reader = new FileReader();
						reader.onloadend = function(evt) {
							console.log("imahge format");
							console.log(file.type);
							if (!file.type) {
								file.type = "image/jpeg";
							}
							deferred.resolve({
								data : evt.target.result.replace("data:" + file.type + ";base64,", ""),
								file : file
							})
						};
						
						reader.readAsDataURL(file);
					}, fail);
				}, fail);
			}, fail, options);
		} else {
			fail("ImagePicker is not initialized");
		}

		function fail(error) {
			console.log("error on send image");
			console.log(error);
			deferred.reject(new Error(error));
		}

		return deferred.promise;
	};
	
	this.uploadImage = function(imageData){
		var deferred = $q.defer();
	
		var fd = new FormData();
		fd.append("image", imageData);
		fd.append("type", "base64");
		fd.append("key", "6528448c258cff474ca9701c5bab6927");
		var xhr = new XMLHttpRequest();
		xhr.open("POST", "http://api.imgur.com/2/upload.json");

		xhr.onload = function () {
			console.log("Response: " + xhr.responseText); 
			var imgUrl = JSON.parse(xhr.responseText).upload.links.imgur_page + ".jpg";
			deferred.resolve(imgUrl);
		};

		xhr.send(fd);
		
		return deferred.promise;
	};
})

.service('ServerClient', function($q){
	this.baseUrl = 'http://192.168.1.12:3000';
	this.serviceUrls = {
		createUser : '/users',
		createNetwork : '/networks',
		updateUser : '/user/edit'
	};
	
	this.socket = null;
	
	// Sends a request to the server to create a new user
	// - avatar - the file metadata of the avatar picture
	// - avatarData - the content of the avatar file
	// - username - the name of the user

	this.createUser = function(username, avatarUrl) {
		var createUserUrl = this.baseUrl + this.serviceUrls.createUser;
		var data = {
				name: username,
				avatar: avatarUrl
		};
		
		return $.ajax({
			type: 'POST',
			url: createUserUrl,
			data: JSON.stringify(data),
			dataType: "application/json",
			contentType: "application/json",
		});
	};
	
	// Creates a new network (or gets the chats
	// of the network if it exists)
	// - networkName - the name of the network
	// - latitude, longitude - the coordinates of the user
	// - token - the token used for authorization
	this.createNetwork = function(networkName, latitude, longitude, token){
		var deferred = $q.defer();
		var createNetworkUrl = this.baseUrl + this.serviceUrls.createNetwork;
		var data = {
				name: networkName,
				lat: latitude,
				lon: longitude
		};
		
		return $.ajax({
			type: 'POST',
			url: createNetworkUrl,
			data: JSON.stringify(data),
			dataType: "application/json",
			contentType: "application/json",
			headers: {
				'authorization' : token
			}
		});
	};

	this.connectToServer = function(userId){
		var deferred = $q.defer();
	
		this.socket = io.connect(this.baseUrl);
		var that = this;
		this.socket.on("connect", function(){
			that.socket.emit('register', userId);
			
			deferred.resolve();
		});
		
		return deferred;
	};
	
	this.onMessageReceived = function(callback){
		this.socket.on("message", function(msg){
			callback(msg);
		});
	};
	
	this.sendMessage = function(message){
		this.socket.emit("message", message);
	};
})

.service('DataStorage', function(){
	
	this.getToken = function(){
		return localStorage.getItem("token");
	};
	
	this.setToken = function(token){
		localStorage.setItem("token", token);
	}
	
	this.getUserId = function(){
		return localStorage.getItem("userId");
	}
	
	this.setUserId = function(id){
		localStorage.setItem("userId", id);
	}
	
	this.getUsername = function(){
		return localStorage.getItem("username");
	}
	
	this.setUsername = function(username){
		localStorage.setItem("username", username); 
	}
	
	this.getAvatar = function(){
		return localStorage.getItem("avatar");
	}
	
	this.setAvatar = function(avatar){
		localStorage.setItem("avatar", avatar);
	}
})

.service('Helpers', function($q){
	this.getNetworkInfo = function(){
		var deferred = $q.defer();
		
	    navigator.wifi.getConnectedWifiInfo(
    		function(success){
	    		deferred.resolve(success)
	    	}, function(error){
	    		deferred.resolve(new Error(error));
	    });
		
		return deferred.promise;
	};
	
	this.getPosition = function(){
		var deferred = $q.defer();
		
		navigator.geolocation.getCurrentPosition(
			function(position){
				deferred.resolve(position);
			}, function(error){
				deferred.reject(new Error(error));
		});
		
		return deferred.promise;
	};
});