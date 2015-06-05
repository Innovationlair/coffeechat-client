(function() {
  var Network;

  Network = (function() {
    function Network(params) {
      var memberParams;
      this.name = params.name;
      this.members = (function() {
        var _i, _len, _ref, _results;
        _ref = params.members;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          memberParams = _ref[_i];
          _results.push(new User(memberParams));
        }
        return _results;
      })();
    }

    return Network;

  })();

}).call(this);
