angular
  .module('meanAuth')
  .controller('loginCtrl', loginCtrl);

function loginCtrl($scope, $location, authentication){
  $scope.credentials = {
    email: "",
    password: ""
  };
  
  $scope.onSubmit = function(){
    $scope.message = "";
    
    if(!$scope.credentials.email || !$scope.credentials.password){
      $scope.message = "All fields required, please try again!";
      return false;
    } else {
      $scope.doLogin();
    }
  };
  
  $scope.doLogin = function(){
    $scope.message = "";
    authentication
      .login($scope.credentials)
      .error(function(err){
      $scope.message = err;
    })
      .then(function(){
      $location.path('/profile');
    });
  }
}