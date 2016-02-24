"use strict"

myAdminApp.controller("CommentsCtrl" ,function ($scope, Comments, $routeParams) {
    var id = $routeParams.id
    $scope.id = id
    $scope.comments = []
    Comments.subscribe(id, function(comment){
        $scope.$apply(function() {
            $scope.comments.push(comment)
        })
    })
    $scope.send = function() {
        Comments.send(id, {
            message : $scope.message,
            date : new Date(),
            name : $scope.name
        })
    }
})