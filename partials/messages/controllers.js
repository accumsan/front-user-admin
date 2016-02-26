"use strict"

app.controller("ChatCtrl" ,function ($scope, Messages) {
    $scope.messages = [];
    $scope.message = "";
    $scope.max = 140;

    $scope.addMessage = function() {
        Messages.send($scope.message);
        $scope.message = "";
    };

    Messages.receive().then(null, null, function(message) {
        $scope.messages.push(message);
    });
})