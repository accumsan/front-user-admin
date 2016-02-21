"use strict";

myAdminApp.filter('poster', function () {
    return function(posterUrl) {
        if(!posterUrl){
            return "images/Icon-user.png"
        } else if (posterUrl.indexOf('placehold.it') > -1){
            return "images/Icon-user.png"
        } else {
            return posterUrl;
        }
    };
});
