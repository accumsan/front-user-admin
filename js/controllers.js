"use strict"


myAdminApp.controller("HeaderCtrl" ,function ($scope, $translate) {
  $scope.changeLanguage = function(key) {
      $translate.use(key)
  }
  $scope.reload = function() {
      window.location.reload()
  }
})

myAdminApp.controller("usersController" ,function ($scope, Users, DataUsers, $q) {
  var fetch = function() {
    Users.fetch().then(function(){
      $scope.users = Users.getUsers()
    })
  }
  fetch()
  $scope.addtest = function() {
    var promises= []
    DataUsers.get().forEach(function (user, index, ar){
      promises.push(Users.create(user))
    })
    $q.all(promises).then(function(res) {
      fetch()
    })
  }
})

myAdminApp.controller("editUserController" ,function ($scope, Users, $routeParams, $location) {
  var key = $routeParams.id
  Users.fetchOne(key).then(function(){
    $scope.user = Users.getUser()
  })

  $scope.save = function() {
    Users.update(key, $scope.user).then(function(resp){
      $location.path('/user/'+key)
    })
  }

  $scope.delete = function() {
    Users.remove(key).then(function(resp){
      $location.path('/users')
    })
  }
})

myAdminApp.controller("addUserController" ,function ($scope, Users, $location) {
  $scope.user = {}
  $scope.save = function() {
    Users.create($scope.user).then(function(resp){
      $location.path('/users')
    })
  }
})

myAdminApp.controller("userInfoController" ,function ($scope, Users, $routeParams) {
  var key = $routeParams.id
  Users.fetchOne(key).then(function(){
    $scope.user = Users.getUser()
  })
})
