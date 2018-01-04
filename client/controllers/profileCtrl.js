angular
  .module('meanAuth')
  .controller('profileCtrl', profileCtrl);

function profileCtrl($scope, dbquery) {

$scope.message = "";
  dbquery
    .getUserData()
    .success(function (data) {
      $scope.user = data;
     
    })
    .error(function (err) {
      $scope.message = err;
    });




}