angular.module('coffeechat.services.socket', ['coffeechat.constants', 'btford.socket-io']).factory('socket', function(socketFactory, BASE_URL) {
  var ioSocket, socket;
  console.log('Socket module!');
  console.log(io);
  ioSocket = io.connect("" + BASE_URL);
  socket = socketFactory({
    ioSocket: ioSocket
  });
  return socket;
});
