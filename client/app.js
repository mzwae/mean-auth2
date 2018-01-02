
  angular.module('meanAuth', ['ngRoute']);

  function config($routeProvider, $locationProvider) {

    $routeProvider
      .when('/', {
        templateUrl: '/views/home.html'
      })
      .when('/signup', {
        templateUrl: '/views/signup.html',
        controller: 'signupCtrl'
      })
      .when('/login', {
        templateUrl: '/views/login.html',
        controller: 'loginCtrl'
      }) 
      .when('/profile', {
        templateUrl: '/views/profile.html',
        controller: 'profileCtrl'
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
