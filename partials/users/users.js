"use strict"

app.factory("Users", function ($http) {
    var API_USER = 'https://' + + Properties.java_server + +'/api/user'
    var users = []
    var user
    return {
        getUsers : function() {
          return users
        },
        getUser : function() {
          return user
        },

        fetch : function() {
            return $http.get(API_USER).then(function(resp){
              users = []
              for (var key in resp.data) {
                var user = JSON.parse(resp.data[key])
                user.key = key
                users.push(user)
              }
            })
        },

        fetchOne : function(key) {
            return $http.get(API_USER + '/' + key).then(function(resp){
              user = JSON.parse(resp.data.user)
              user.key = key
            })
        },

        create : function(user) {
            return  $http.post(API_USER, user)
        },

        remove  : function(key) {
            return $http.delete(API_USER + '/' + key)
        },

        update : function(key, user) {
             return $http.put(API_USER + '/' + key, user)
        }

    }

})
