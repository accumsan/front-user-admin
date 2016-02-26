"use strict"

app.service("WsMessages", function($q) {
    var service = {}
    var listener = $q.defer()
    var ws
    service.SOCKET_URL = 'ws://localhost:8080/data';
    service.RANDOM = 'random'
    service.random = function() {
        ws.send(service.RANDOM);
    }
    service.send = function(message) {
        ws.send(message);
    }
    service.receive = function() {
        return listener.promise;
    }

    var initialize = function() {
        ws = new WebSocket(service.SOCKET_URL);
        ws.onmessage = function(m) {
           listener.notify(m);
        }
        ws.onclose = function(m) {
            console.log('onclose')
            ws = null
        }
        ws.onopen = function(event) {
            console.log('onopen')
        }
    }
    initialize()
    return service
})