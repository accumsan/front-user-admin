"use strict"

app.service("Messages", function($q, $timeout) {
    var service = {}
    var listener = $q.defer()
    var socket = {client: null, stomp: null}
    var messageIds = []

    service.RECONNECT_TIMEOUT = 30000;
    service.SOCKET_URL = 'http://' + Properties.java_server + '/chat';
    service.CHAT_TOPIC = "/topic/message";
    service.CHAT_BROKER = "/app/chat";
    service.CHAT_RANDOM = "/app/random";

    service.receive = function() {
      return listener.promise;
    };

    service.random = function() {
        socket.stomp.send(service.CHAT_RANDOM);
    }

    service.send = function(message) {
      var id = Math.floor(Math.random() * 1000000);
      socket.stomp.send(service.CHAT_BROKER, {
        priority: 9
      }, JSON.stringify({
        message: message,
        id: id
      }));
      messageIds.push(id);
    };

    var reconnect = function() {
      $timeout(function() {
        initialize();
      }, this.RECONNECT_TIMEOUT);
    };

    var getMessage = function(data) {
      var message = JSON.parse(data), out = {};
      out.message = message.message;
      out.time = new Date(message.time);
      if (_.contains(messageIds, message.id)  ) {
        out.self = true;
        messageIds = _.without(messageIds, message.id);
      }
      return out;
    };

    var startListener = function() {
      socket.stomp.subscribe(service.CHAT_TOPIC, function(data) {
        listener.notify(getMessage(data.body));
      });
    };

    var initialize = function() {
      socket.client = new SockJS(service.SOCKET_URL);
      socket.stomp = Stomp.over(socket.client);
      socket.stomp.connect({}, startListener);
      socket.stomp.onclose = reconnect;
    };

    initialize();
    return service;
})