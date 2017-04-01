'use strict';

// Declare app level module which depends on views, and components
var myapp = angular.module('myApp', [
  'ui.router',
  'ngResource',
  'myApp.resource',
  'oc.lazyLoad',
  'myApp.service',
  'myApp.home',
  'myApp.order',
  'myApp.house',
  'myApp.auth',
  'myApp.member',
  'myApp.shoppingCart'

]);

myapp.constant('API_HOST', 'http://shama.demo.com');

myapp.constant('AccessLevels', {
  anon: 0,
  user: 1
});

myapp.filter('propsFilter', function() {
  return function(items, props) {
    var out = [];
    if (angular.isArray(items)) {
      items.forEach(function(item) {
        var itemMatches = false;
        var keys = Object.keys(props);
        for (var i = 0; i < keys.length; i++) {
          var prop = keys[i];
          var text = props[prop].toLowerCase();
          if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
            itemMatches = true;
            break;
          }
        }
        if (itemMatches) {
          out.push(item);
        }
      });
    } else {
      // Let the output be the input untouched
      out = items;
    }
    return out;
  }
});

myapp.config(function config($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
  $ocLazyLoadProvider.config({
    // Set to true if you want to see what and when is dynamically loaded
    debug: false
  });

  $urlRouterProvider.otherwise("/");
});

myapp.run(function($rootScope, $state, Auth, $location) {
  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
    console.log("toState is ", toState);
    var access;
    if (toState.data) {
      if (toState.data.access) {
        access = toState.data.access;
      } else {
        access = false;
      }
    } else {
      access = false;
    }
    console.log("toState access is ", access);
    if (!Auth.authorize(access)) {
      console.log("in auth is ");
      event.preventDefault();

      // $location.path('/login');
      $state.go('/login');
      $rootScope.isAuth = false;
    }else{
      $rootScope.isAuth = true;
    }
  });
});
