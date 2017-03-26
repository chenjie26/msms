/**
 * Created by jackson on 2017-3-24.
 */

angular.module('myApp.auth', ['ui.router', 'oc.lazyLoad', 'myApp.services'])

.config(function($stateProvider, $ocLazyLoadProvider) {
    $stateProvider.state('/login', {
        url: '/login',
        templateUrl: 'auth/login.html',
        controller: 'LoginCtrl'
    })
    .$stateProvider.state('/register', {
        url: '/register',
        templateUrl: 'auth/register.html',
        controller: 'RegisterCtrl'
    })
    .$stateProvider.state('/register2', {
        url: '/register2',
        templateUrl: 'auth/register2.html',
        controller: 'Register2Ctrl'
    });
})


.controller('LoginCtrl', function($scope, ServicePopulate) {

    $scope.data = {};

    $scope.login = function () {
        $scope.details = service.details;
    }

});