"use strict"

app.factory("Comments", function ($http) {
    var API_COMMENT = Properties.java_server + '/comment'
    return {
        subscribe : function(id, callback) {
            var eventSource = new EventSource(API_COMMENT + 's/' + id);
            eventSource.addEventListener('commentPostedEvent', function(event) {
                callback(JSON.parse(event.data))
            }, false);
        },

        send : function(id, comment) {
            return $http.post(API_COMMENT + '/' + id, comment)
        }
    }

})
