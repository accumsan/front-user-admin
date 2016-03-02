"use strict"

app.service("Python", function($q, $http) {
    var service = {}
    var listener = $q.defer()
    var ws
    var REST_URL = 'http://' + Properties.java_server + '/api/python'
    service.SOCKET_URL = 'ws://' + Properties.java_server + '/python'
    
    service.send = function(message) {
        return $http.post(REST_URL, message)
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