"use strict"

app.controller("CommentsCtrl" ,function ($scope, Comments, $routeParams, NgTableParams) {
    var id = $routeParams.id
    var comments = []
    $scope.ngTable = new NgTableParams({}, {dataset: comments});
    $scope.id = id
    Comments.subscribe(id, function(comment){
        $scope.$apply(function() {
            comments.push(comment)
            $scope.ngTable.reload()
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