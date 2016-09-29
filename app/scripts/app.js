(function() {
  function config($stateProvider, $locationProvider) {
    $locationProvider
      .html5Mode({
        enabled: true,
        requireBase: false
      });

    $stateProvider
      .state('home', {
        url: '/',
        controller: 'HomeCtrl as home',
        templateUrl: '/templates/home.html'
      })

      .state('history', {
        url: '/history',
        controller: 'HomeCtrl as history',
        templateUrl: '/templates/history.html'
      });
  }
  angular
    .module('blocitoff', ['ui.router', 'firebase'])
    .config(config)
})();
