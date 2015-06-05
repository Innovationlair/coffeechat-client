angular.module("coffeechat", ['coffeechat.services.token',
                              'coffeechat.services.socket',
                              'coffeechat.controllers.networkController',
                              'coffeechat.controllers.networksListController',
                              'coffeechat.controllers.chatController',
                              'ionic'])
  .config ($stateProvider, $urlRouterProvider) ->
    console.log 'CoffeeChat configured!'
    $stateProvider

    .state 'network',
      url: '/network',
      templateUrl: 'templates/members-list.html',
      controller: 'NetworkController'

    .state 'networks',
      url: '/networks',
      templateUrl: 'templates/networks-list.html',
      controller: 'NetworksListController'

    .state 'chat',
      url: '/chatwith/:memberId',
      templateUrl: 'templates/chat.html',
      controller: 'ChatController'

    # if none of the above states are matched, use this as the fallback
    # $urlRouterProvider.otherwise('/home')

  .run ($ionicPlatform, $window, TokenService, $state, socket) ->
    $ionicPlatform.ready ->
      console.log 'Device ready'
      TokenService.setup_token().then (token) ->
        console.log token

        # Register for chat
        socket.on 'connect', ->
          socket.emit('register', token)

        socket.on 'message', (data)->
          console.log 'Received:', data

        switch $window.navigator.network.connection.type
          when Connection.WIFI
            $state.go('network')
          when Connection.CELL_2G, Connection.CELL_3G, Connection.CELL_4G, Connection.CELL
            $state.go('networks')
          else console.log 'No internet'
