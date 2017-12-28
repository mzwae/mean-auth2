angular
  .module('meanAuth')
  .controller('login', function ($scope, $http, $window, $location) {



      $scope.userlogin = function () {
        $http({
          method: "post",
          url: '/login',
          data: {
            email: $scope.local.email,
            password: $scope.local.password
          },
        }).success(function (response) {
          $scope.userData = response;
          $window.localStorage.userData = $scope.userData;
          console.log("success!!");
          console.log('response: ', response);
          $location.path("/profile")
        }).error(function (response) {
          console.log("error!!");
          $location.path("/login")
        });
      }
});