
  angular.module('meanAuth', ['ngRoute']);

  function config($routeProvider, $locationProvider) {

    $routeProvider
      .when('/', {
        templateUrl: '/views/home.html'
      })
      .when('/signup', {
        templateUrl: '/views/signup.html'
      })
      .when('/login', {
        templateUrl: '/views/login.html',
        controller: 'login'
      }) 
      .when('/connect/local', {
        templateUrl: '/views/connect-local.html',
        controller: 'loginCtrl'
      }) 
      .when('/profile', {
        templateUrl: '/views/profile.html'
      })
     
      .otherwise({
        redirectTo: '/'
      });

  /*  $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });*/
  }


  angular
    .module('meanAuth')
    .config(['$routeProvider', '$locationProvider', config]);
