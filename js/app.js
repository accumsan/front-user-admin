"use strict";

var myAdminApp = angular.module('myAdminApp', ['ngRoute', 'pascalprecht.translate', 'ngCookies']);

myAdminApp.config(['$routeProvider', '$translateProvider',
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
