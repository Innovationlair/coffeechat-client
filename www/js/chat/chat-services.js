angular.module('coffeechat.chat.services', [])


.service('Chats', function($filter) {
  this.byId = function(chatId) {
    return $filter('filter')(chats, function(chat) {
      return chat.id == chatId;
    })[0];
  };

  this.all = function() {
    return chats;
  };
  // Might use a resource here that returns a JSON array

  this.setChats = function(chatsArray){
	chats = chatsArray;  
  };
  
  this.addChat = function(chatObj){
	  chats.push(chatObj);
  };
  
  var chats = [];
  // Some fake testing data
//  var chats = [{
//    id: '1',
//    name: 'Ben Sparrow',
//    lastText: 'You on your way?',
//    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png',
//    unreadMessages: 3
//  }, {
//    id: '2',
//    name: 'Max Lynx',
//    lastText: 'Hey, it\'s me',
//    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460',
//    unreadMessages: 22
//  }, {
//    id: '3',
//    name: 'Adam Bradleyson',
//    lastText: 'I should buy a boat',
//    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg',
//    unreadMessages: 7
//  }, {
//    id: '4',
//    name: 'Perry Governor',
//    lastText: 'Look at my mukluks!',
//    face: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png',
//    unreadMessages: 1
//  }, {
//    id: '5',
//    name: 'Mike Harrington',
//    lastText: 'This is wicked good ice cream.',
//    face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png',
//    unreadMessages: 0
//  }];

});