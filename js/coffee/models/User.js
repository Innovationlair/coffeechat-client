(function() {
  var User;

  User = (function() {
    function User(params) {
      this.name = params.name;
      this.avatarURL = params.avatar;
      this.id = params._id;
    }

    return User;

  })();

}).call(this);
