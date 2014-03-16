angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('User', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var users = [{'name':'Ivan', 'lastname':'Ivanov', 'thumb':'ionic.png'},
            {'name':'Ivan', 'lastname':'Ivanov', 'thumb':'ionic.png'},
            {'name':'Ivan', 'lastname':'Ivanov', 'thumb':'ionic.png'},
            {'name':'Ivan', 'lastname':'Ivanov', 'thumb':'ionic.png'},
            {'name':'Ivan', 'lastname':'Ivanov', 'thumb':'ionic.png'},
            {'name':'Ivan', 'lastname':'Ivanov', 'thumb':'ionic.png'},
            {'name':'Ivan', 'lastname':'Ivanov', 'thumb':'ionic.png'},
            {'name':'Ivan', 'lastname':'Ivanov', 'thumb':'ionic.png'},
            {'name':'Ivan', 'lastname':'Ivanov', 'thumb':'ionic.png'},
            {'name':'Ivan', 'lastname':'Ivanov', 'thumb':'ionic.png'},
            {'name':'Ivan', 'lastname':'Ivanov', 'thumb':'ionic.png'},
            {'name':'Ivan', 'lastname':'Ivanov', 'thumb':'ionic.png'},
            {'name':'Ivan', 'lastname':'Ivanov', 'thumb':'ionic.png'},
            {'name':'Ivan', 'lastname':'Ivanov', 'thumb':'ionic.png'}];

  return {
    all: function() {
      return users;
    },
    get: function(petId) {
      // Simple index lookup
      return pets[petId];
    }
  }
});
