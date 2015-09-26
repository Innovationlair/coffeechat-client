angular.module('coffeechat.chat.chat-detail.controllers', [
  'coffeechat.user.services'
])

.controller('ChatDetailCtrl', function(
  $scope,
  $rootScope,
  $state,
  $stateParams,
  $ionicActionSheet,
  $ionicPopup,
  $ionicScrollDelegate,
  $timeout,
  $interval,
  User,
  ChatDetail,
  ServerClient,
  DataStorage) {

  $scope.messages = [];
  
  // mock acquiring data via $stateParams
  $scope.toUser = User.byId($stateParams.userId);

  $scope.currentUser._id = DataStorage.getUserId();
  $scope.currentUser.pic = DataStorage.getAvatar();
  
  $scope.input = {
    message: localStorage['userMessage-' + $scope.toUser._id] || ''
  };

  var messageCheckTimer;

  var viewScroll = $ionicScrollDelegate.$getByHandle('userMessageScroll');
  var footerBar; // gets set in $ionicView.enter
  var scroller;
  var txtInput; // ^^^

  $scope.$on('$ionicView.enter', function() {

    getMessages();
    
    connectToServer();

    $timeout(function() {
      footerBar = document.body.querySelector('#userMessagesView .bar-footer');
      scroller = document.body.querySelector('#userMessagesView .scroll-content');
      txtInput = angular.element(footerBar.querySelector('textarea'));
    }, 0);

    messageCheckTimer = $interval(function() {
      // here you could check for new messages if your app doesn't use push notifications or user disabled them
    }, 20000);
  });

  $scope.$on('$ionicView.leave', function() {
    // Make sure that the interval is destroyed
    if (angular.isDefined(messageCheckTimer)) {
      $interval.cancel(messageCheckTimer);
      messageCheckTimer = undefined;
    }
  });

  $scope.$on('$ionicView.beforeLeave', function() {
    if (!$scope.input.message || $scope.input.message === '') {
      localStorage.removeItem('userMessage-' + $scope.toUser._id);
    }
  });

  function getMessages() {
    // the service is mock but you would probably pass the toUser's GUID here
    /*ChatDetail.messagesByChatId($scope.toUser._id)
      .then(function(data) {
        $scope.doneLoading = true;
        $scope.messages = data.messages;

        
      });*/
	  $timeout(function() {
          viewScroll.scrollBottom();
        }, 0);
  }
  
  function connectToServer(){
	  ServerClient.onMessageReceived(onMessageReceived);
  }
  
	function onMessageReceived(msg){
		console.log("Message received: " + JSON.stringify(msg));
		$scope.messages.push({
			body: msg.message,
			_id : new Date().getTime(),
			date : new Date(),
			username : DataStorage.name,
			senderId : msg.senderId,
			pic : $scope.currentUser.pic,
		});
		$scope.$apply();
	}

  $scope.$watch('input.message', function(newValue, oldValue) {
    if (!newValue) newValue = '';
    localStorage['userMessage-' + $scope.toUser._id] = newValue;
  });

  $scope.sendMessage = function(sendMessageForm) {
    var message = {
    		recipientId: $scope.toUser._id,
    		body: $scope.input.message
    };

    // if you do a web service call this will be needed as well as before the viewScroll calls
    // you can't see the effect of this in the browser it needs to be used on a real device
    // for some reason the one time blur event is not firing in the browser but does on devices
    keepKeyboardOpen();

    $scope.input.message = '';

    message._id = new Date().getTime();
    message.date = new Date();
    message.username = DataStorage.name;
    message.senderId = DataStorage.getUserId();
    message.pic = $scope.currentUser.pic;
    
    ServerClient.sendMessage(message);
    
    $scope.messages.push(message);

    $timeout(function() {
      keepKeyboardOpen();
      viewScroll.scrollBottom(true);
    }, 0);

  };

  // this keeps the keyboard open on a device only after sending a message, it is non obtrusive
  function keepKeyboardOpen() {
    txtInput.one('blur', function() {
      txtInput[0].focus();
    });
  }

  $scope.onMessageHold = function(e, itemIndex, message) {
    $ionicActionSheet.show({
      buttons: [{
        text: 'Copy Text'
      }, {
        text: 'Delete Message'
      }],
      buttonClicked: function(index) {
        switch (index) {
          case 0: // Copy Text
            //cordova.plugins.clipboard.copy(message.text);

            break;
          case 1: // Delete
            // no server side secrets here :~)
            $scope.messages.splice(itemIndex, 1);
            $timeout(function() {
              viewScroll.resize();
            }, 0);

            break;
        }

        return true;
      }
    });
  };

  // this prob seems weird here but I have reasons for this in my app, secret!
  $scope.viewProfile = function(msg) {
    if (msg.senderId === $scope.currentUser._id) {
      // go to your profile
    } else {
      // go to other users profile
    }
  };

  // I emit this event from the monospaced.elastic directive, read line 480
  $scope.$on('taResize', function(e, ta) {
    console.log('taResize');
    if (!ta) return;

    var taHeight = ta[0].offsetHeight;
    console.log('taHeight: ' + taHeight);

    if (!footerBar) return;

    var newFooterHeight = taHeight + 10;
    newFooterHeight = (newFooterHeight > 44) ? newFooterHeight : 44;

    footerBar.style.height = newFooterHeight + 'px';
    scroller.style.bottom = newFooterHeight + 'px';
  });

});
