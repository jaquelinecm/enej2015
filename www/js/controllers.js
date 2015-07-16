angular.module('enejApp')

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $http, $rootScope, $cordovaSQLite, Session) {
  
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
  var query = "INSERT INTO people (firstname, lastname) VALUES (?,?)";
        $cordovaSQLite.execute(db, query, ['teste', 'teste']).then(function(res) {
            console.log("INSERT ID -> " + res.insertId);
        }, function (err) { 
            console.error(err);
        });

  var query = "SELECT firstname, lastname FROM people WHERE lastname = ?";
        $cordovaSQLite.execute(db, query, ['teste']).then(function(res) {
            if(res.rows.length > 0) {
                console.log("SELECTED -> " + res.rows.item(0).firstname + " " + res.rows.item(0).lastname);
            } else {
                console.log("No results found");
            }
        }, function (err) {
            console.error(err);
        });

  $scope.erroLogin = false;
  $scope.messageError = "";
  
  // Form data for the login modal
  $scope.loginData = {};

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    $http.get('http://sistema.enej15.com.br/authentication/mobile/request/',{ params: { "user": $scope.loginData.username, "password": $scope.loginData.password } }).then(function(resp) {
      console.log('Success', resp.data);

      $scope.messageError = resp.data.message; 

      if(resp.data.success){
        $scope.erroLogin = false;
        Session.create($scope.loginData.username,$scope.loginData.password,true);
      } else {
        $scope.erroLogin = true;
      }
      
      // For JSON responses, resp.data contains the result
    }, function(err) {
      $scope.erroLogin = true;
      console.error('ERR', err);
      // Here goes the pupeet user for local development
      

      
      // err.status will contain the status code
    });


    $rootScope.loggedUser = Session;

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };

  
  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };
})



.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
