"use strict";

var app = angular.module('app', ['ngRoute', 'pascalprecht.translate', 'ngCookies', 'ngTable']);
var Properties = {}

app.config(['$routeProvider', '$translateProvider',
  function($routeProvider, $translateProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: 'partials/home.html'
        })
        .when('/users', {
            templateUrl: 'partials/users/list.html',
            controller : 'usersController'
        })
        .when('/user/:id', {
            templateUrl: 'partials/users/user.html',
            controller : 'userInfoController'
        })
        .when('/users/edit/:id', {
            templateUrl: 'partials/users/edit.html',
            controller: 'editUserController'
        })
        .when('/users/add', {
            templateUrl: 'partials/users/edit.html',
            controller: 'addUserController'
        })
        .when('/comments', {
            templateUrl: 'partials/comments/comments.html'
        })
        .when('/comments/:id', {
            templateUrl: 'partials/comments/room.html',
            controller: 'CommentsCtrl'
        })
        .when('/chat', {
            templateUrl: 'partials/messages/chat.html',
            controller: 'ChatCtrl'
        })
        .when('/python', {
            templateUrl: 'partials/python/python.html',
            controller: 'PythonCtrl'
        })
        .otherwise({
            redirectTo: '/home'
        });
    $translateProvider.useStaticFilesLoader({
        prefix: 'i18n/',
        suffix: '.json'
    });
    $translateProvider.preferredLanguage('fr');
    $translateProvider.useCookieStorage();
}]);


app.run(function($http) {
    $http.get('properties').then(function(response){
        Properties.java_server = response.data.JAVA_SERVER
        Properties.python_server = response.data.PYTHON_SERVER
    })
})