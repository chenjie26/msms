'use strict';

// Declare app level module which depends on views, and components
var myapp = angular.module('myApp', [
  'ui.router',
  'ngResource',
  'myApp.resource',
  'oc.lazyLoad',
  'myApp.home',
  'myApp.service',
  'myApp.order',
  'myApp.house'
]);

myapp.constant('API_HOST', 'http://shama.jcjever.com');

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
