angular.module('coffeechat.services.socket', ['coffeechat.constants', 'btford.socket-io'])


.factory 'socket', (socketFactory, BASE_URL) ->
  console.log 'Socket module!'
  console.log io
  ioSocket = io.connect("#{BASE_URL}")

  socket = socketFactory
    ioSocket: ioSocket

  return socket
