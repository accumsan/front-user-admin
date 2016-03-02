"use strict"

app.controller("PythonCtrl" ,function ($scope, Python) {
    $scope.messages = [];
    //Use Websocket native

    $scope.sendMessage = function(message) {
       Python.send(message)
    }

    Python.receive().then(null, null, function(message) {
        $scope.messages.push(message)
    })

})