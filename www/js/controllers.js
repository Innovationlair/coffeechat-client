angular.module('starter.controllers', ['ionic.service.platform', 'ionic.ui.content', 'ionic.ui.list', 'ionic.service.loading'])


// A simple controller that fetches a list of data from a service
.controller('UserListCtrl', function($scope, User) {
  // "Pets" is a service returning mock data (services.js)
  $scope.users = User.all();
  // $scope.pets = PetService.all();
})