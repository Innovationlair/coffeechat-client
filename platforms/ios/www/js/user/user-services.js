angular.module('coffeechat.user.services', [])

.filter('profilePicture', function(User) {
  return function(userId) {
    return (User.byId(userId) || {}).pic;
  };
})

.service('User', function($filter) {
  this.byId = function(id) {
    return $filter('filter')(users, function(user) {
      return user._id === id;
    })[0];
  };

  this.me = {
    _id: '6',
    name: {first: 'Alex', last: 'Marinov'},
    pic: 'https://avatars0.githubusercontent.com/u/1151641?v=3&s=460'
  };
  
  this.addUser = function(userObj){
	  users.push(userObj);
  };

  var users = [];
  // Some fake testing data
//  var users = [{
//    _id: '1',
//    name: {first: 'Ben', last: 'Sparrow'},
//    pic: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
//  }, {
//    _id: '2',
//    name: {first: 'Max', last: 'Lynx'},
//    pic: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
//  }, {
//    _id: '3',
//    name: {first: 'Adam', last: 'Bradleyson'},
//    pic: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
//  }, {
//    _id: '4',
//    name: {first: 'Perry', last: 'Governor'},
//    pic: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png'
//  }, {
//    _id: '5',
//    name: {first: 'Mike', last: 'Harrington'},
//    pic: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
//  }];
});