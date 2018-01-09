angular
  .module('meanAuth')
  .service('authentication', authentication);

function authentication($window, $http) {
  var saveToken = function (token) {
    $window.localStorage['meanAuth-token'] = token;
  };

  var getToken = function () {
    return $window.localStorage['meanAuth-token'];
  };

  var register = function (user) {
    return $http
      .post('/register', user)
      .success(function (data) {
        saveToken(data.token);
      });
  };

  var login = function (user) {
    return $http
      .post('/login', user)
      .success(function (data) {
        saveToken(data.token);
      });
  };

  var logout = function () {
    $window.localStorage.removeItem('meanAuth-token');
  };

  var isLoggedIn = function () {
    var token = getToken();

    //if token exists, get payload, decode it, and parse it to JSON
    if (token) {
      var payload = JSON.parse($window.atob(token.split('.')[1]));

      return payload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  };
  
  var getUser = function(){
    if(isLoggedIn()){
      var token = getToken();
      var payload = JSON.parse($window.atob(token.split('.')[1]));
      return {
        email: payload.email,
        name: payload.name,
        id: payload._id
      }
    }
  };

  return {
    saveToken: saveToken,
    getToken: getToken,
    register: register,
    login: login,
    logout: logout,
    isLoggedIn: isLoggedIn, 
    getUser: getUser
  };
}