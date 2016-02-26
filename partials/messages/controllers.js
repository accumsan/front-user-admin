"use strict"

app.controller("ChatCtrl" ,function ($scope, Messages, WsMessages) {
    $scope.messages = [];
    $scope.message = "";
    $scope.max = 140;

    $scope.addMessage = function() {
        Messages.send($scope.message);
        $scope.message = "";
    };

    $scope.random = function() {
        Messages.random()
    };

    Messages.receive().then(null, null, function(message) {
        $scope.messages.push(message);
    });

    //Use Websocket native

    $scope.mes = []
    $scope.input = ""
    $scope.sendMessage = function(message) {
        WsMessages.send($scope.input)
    };

    $scope.randomMessage = function() {
        WsMessages.random()
    };

    WsMessages.receive().then(null, null, function(message) {
        $scope.mes.push(message);
    });

})