"use strict";

app.directive('userButtons', function(){
    return {
        restrict : 'E',
        replace : true,
        templateUrl: 'partials/users/buttons.html',
        scope : {
            size : '@',
            key : '@'
        },
        controller : ['$scope', 'Users', '$location', function($scope, Users, $location) {
          $scope.delete = function() {
            Users.remove($scope.key).then(function(){
              if ($location.path() == '/users') {
                window.location.reload()
              } else {
                $location.path("users")
              }
            })
          }
        }]
    }
});
