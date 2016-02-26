"use strict"


app.controller("HeaderCtrl" ,function ($scope, $translate) {
  $scope.changeLanguage = function(key) {
      $translate.use(key)
  }
  $scope.reload = function() {
      window.location.reload()
  }
})

app.controller("usersController" ,function ($scope, Users, DataUsers, $q) {
  var fetch = function() {
    Users.fetch().then(function(){
      $scope.users = Users.getUsers()
    })
  }
  var dataUsers = DataUsers.get()
  var dataUsersSize = dataUsers.length
  var addTestWithIndex = function(index) {
    console.log('addTestWithIndex : ' + index)
    if (index >= dataUsersSize) {
      fetch()
    } else {
      Users.create(dataUsers[index]).then(function() {
        addTestWithIndex(index+1)
      })
    }
  }
  $scope.addtest = function() {
    addTestWithIndex(0)
  }
  fetch()
})

app.controller("editUserController" ,function ($scope, Users, $routeParams, $location) {
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

app.controller("addUserController" ,function ($scope, Users, $location) {
  $scope.user = {}
  $scope.save = function() {
    Users.create($scope.user).then(function(resp){
      $location.path('/users')
    })
  }
})

app.controller("userInfoController" ,function ($scope, Users, $routeParams) {
  var key = $routeParams.id
  Users.fetchOne(key).then(function(){
    $scope.user = Users.getUser()
  })
})
