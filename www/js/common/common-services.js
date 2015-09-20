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
			quality : 80
		};

		if (window.imagePicker) {
			window.imagePicker.getPictures(function(results) {
				var selected = results[0];

				window.resolveLocalFileSystemURL(selected, function(data) {
					data.file(function(file) {
						var reader = new FileReader();
						reader.onloadend = function(evt) {
							deferred.resolve({
								data : evt.target.result,
								file : file
							})
						};
						
						reader.readAsBinaryString(file);
					}, fail);
				}, fail);
			}, fail, options);
		} else {
			fail("ImagePicker is not initialized");
		}

		function fail(error) {
			deferred.reject(new Error(error));
		}

		return deferred.promise;
	};
})

.service('ServerClient', function($q){
	this.baseUrl = 'http://192.168.137.1:3000';
	this.serviceUrls = {
		createUser : '/users',
		createNetwork : '/networks'
	};
	
	// Sends a request to the server to create a new user
	// - avatar - the file metadata of the avatar picture
	// - avatarData - the content of the avatar file
	// - username - the name of the user
	this.createUser = function(avatar, avatarData, username) {

		var deferred = $q.defer();
		
		var boundary = "blob";
		var requestBody = this.createRequestBodyWithFileAndText(
				"avatar", avatar, avatarData, "name", username, boundary);
		
		var xhr = new XMLHttpRequest();
		var createUserUrl = this.baseUrl + this.serviceUrls.createUser;
		xhr.open('POST', createUserUrl);
		
		// add the required HTTP header to handle a multipart form data POST request
 		xhr.setRequestHeader('Content-Type','multipart/form-data; boundary=' + boundary);
 		xhr.setRequestHeader('Content-Length', requestBody.length);
 		
 		xhr.addEventListener('load', function(event) {
		      deferred.resolve(JSON.parse(xhr.responseText));
	    });

		xhr.addEventListener('error', function(event) {
			deferred.reject(new Error(xhr.responseText));
	    });

		xhr.send(requestBody);
		
		return deferred.promise;
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
	
	
	// Creates the body of a multipart/form-data request
	// that contains a file and a text value
	// - fileValueKey - the name of the file field to be sent
	// - file - the file metadata
	// - fileData - the dile binary content
	// - textKey - the name of the text field to be sent
	// - textValue - the value of the text field
	// - boundary - delimiter that separates the file/text fields
	this.createRequestBodyWithFileAndText = function(fileValueKey, file, fileData, 
			textKey, textValue, boundary) {
 		var reqBody = "";
 		
 		// construct the body
 		reqBody += "--" + boundary + "\r\n";
 		reqBody += "content-disposition: form-data; "
 			+ 'name="' + fileValueKey + '"; '
 			+ 'filename="' + file.name + '"\r\n';
 		
 		reqBody += "Content-Type: " + file.type + "\r\n";
 		reqBody += "\r\n";
 		
 		reqBody += fileData + "\r\n";
 		
 		reqBody += "--" + boundary + "\r\n";
 		reqBody += 'content-disposition: form-data; name="' + textKey + '"\r\n';
 		reqBody += "\r\n";
 		reqBody += textValue + "\r\n";
 		reqBody += "--" + boundary + "\r\n";
 		
 		return reqBody;
	};
})

.service('DataStorage', function(){
	this.token = "";
	this.name = "";
	this.networkName = "";
	
	this.getToken = function(){
		return localStorage.getItem("token");
	};
	
	this.setToken = function(token){
		localStorage.setItem("token", token);
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