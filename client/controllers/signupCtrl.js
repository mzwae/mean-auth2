angular
  .module('meanAuth')
  .controller('signupCtrl', signupCtrl);

function signupCtrl($scope, $location, authentication){
  $scope.credentials = {
    name: "", 
    email: "",
    password: ""
  };
  
  $scope.onSubmit = function(){
    console.log('onSubmit clicked!');
    $scope.message = "";
    if(!$scope.credentials.name || !$scope.credentials.email || !$scope.credentials.password){
      $scope.message = "All fields require, Please try again!";
      
      return false;
    } else {
      $scope.doRegister();
    }
  };
  
  $scope.doRegister = function(){
    $scope.message = "";
    authentication
      .register($scope.credentials)
      .error(function(err){
      $scope.message = err;
    })
      .then(function(){
      $location.path('/profile');
    });
  };
}