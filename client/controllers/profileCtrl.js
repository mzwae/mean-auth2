angular
  .module('meanAuth')
  .controller('profileCtrl', profileCtrl);

function profileCtrl($scope, dbquery, authentication, $location) {

  if (!authentication.isLoggedIn()) {
    $location.path('/');
  }

  $scope.message = "";

  if (authentication.isLoggedIn()) {
    dbquery
      .getUserData()
      .success(function (data) {
        $scope.user = data;
      console.log($scope.user);

      })
      .error(function (err) {
        $scope.message = err;
      });
  }
  
  $scope.logout = function () {
    authentication.logout();
    $location.path('/');
  };


}