angular.module('starter', [
  'ionic',
  'angularMoment',
  'starter.controllers',
  'starter.services',
  'coffeechat.chat',
  'monospaced.elastic'
])

.run(function($ionicPlatform, $location) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
    
    $location.path('/tabs/look-around');
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: "/tabs",
    abstract: true,
    templateUrl: "templates/tabs.html",
    controller: 'MainCtrl'
  })

  // Each tab has its own nav history stack:

  .state('tab.look-around', {
    url: '/look-around',
    views: {
      '': {
        templateUrl: 'templates/look-around.html',
        controller: 'LookAroundCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        '': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:userId',
      views: {
        '': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      '': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  //$urlRouterProvider.otherwise('/tabs/look-around');

});