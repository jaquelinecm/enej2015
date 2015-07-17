// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var myApp = angular.module('enejApp', [
  'ionic',
  'ngCordova',
  'ionic.service.core',
  'ionic.service.push',
])

myApp.run(function($ionicPlatform, $cordovaSQLite) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    
    if (window.cordova) {
      db = $cordovaSQLite.openDB({ name: "my.db" }); //device
    }else{
      db = window.openDatabase("my.db", '1', 'my', 1024 * 1024 * 100); // browser
    }
    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS people (id integer primary key, firstname text, lastname text)");
    
  });
})

myApp.config(['$ionicAppProvider', function($ionicAppProvider) {
  // Identify app
  $ionicAppProvider.identify({
    // The App ID (from apps.ionic.io) for the server
    app_id: '33666b21',
    // The public API key all services will use for this app
    api_key: 'c38b69181133f0ab8ca44e3adc97b6c312ae35aedcee80b4',
    // Set the app to use development pushes
    dev_push: true
  });
}])

myApp.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.welcome', {
    url: "/welcome",
    views: {
      'menuContent': {
        templateUrl: "templates/welcome.html",
        controller: 'WelcomeCtrl'
      }
    },
      
  })

  .state('app.congressmanManual', {
    url: "/congressmanManual",
    views: {
      'menuContent': {
        templateUrl: "templates/congressmanManual.html",
        controller: 'CongressmanmanualCtrl'
      },
      
    }
  })

  .state('app.sponsors', {
    url: "/sponsors",
    views: {
      'menuContent': {
        templateUrl: "templates/sponsors.html",
        controller: 'SponsorsCtrl'
      },
      
    }
  })

  .state('app.sponsorInstitutoSabin', {
    url: "/sponsorInstitutoSabin",
    views: {
      'menuContent': {
        templateUrl: "templates/sponsorInstitutoSabin.html",
        controller: 'SponsorInstitutoSabinCtrl'
      },
    }
  })

  .state('app.login', {
    url: "/login",
    views: {
      'menuContent': {
        templateUrl: "templates/login.html"
      }
    }
  })

  .state('app.search', {
    url: "/search",
    views: {
      'menuContent': {
        templateUrl: "templates/search.html"
      }
    }
  })

  .state('app.browse', {
    url: "/browse",
    views: {
      'menuContent': {
        templateUrl: "templates/browse.html"
      }
    }
  })
    
  .state('app.playlists', {
    url: "/playlists",
    views: {
      'menuContent': {
        templateUrl: "templates/playlists.html",
        controller: 'PlaylistsCtrl'
      }
    }
  })

  .state('app.single', {
    url: "/playlists/:playlistId",
    views: {
      'menuContent': {
        templateUrl: "templates/playlist.html",
        controller: 'PlaylistCtrl'
      }
    }
  });



  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/welcome');
});
