angular
  .module('meanAuth')
  .service('dbquery', dbquery);

function dbquery($http, authentication) {
  var getUserData = function () {
    var token = authentication.getToken();
    var user = authentication.getUser();
    return $http
      .post('/userdata', user, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      });
     
  };


  return {
    getUserData: getUserData
  };
}