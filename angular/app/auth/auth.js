/**
 * Created by jackson on 2017-3-24.
 */

angular.module('myApp.auth', [])

.config(function($stateProvider, $ocLazyLoadProvider) {
    $stateProvider.state('/login', {
        url: '/login',
        templateUrl: 'auth/login.html',
        controller: 'LoginCtrl'
    }).state('/register', {
        url: '/register',
        templateUrl: 'auth/register.html',
        controller: 'RegisterCtrl'
    }).state('/register2', {
        url: '/register2',
        templateUrl: 'auth/register2.html',
        controller: 'Register2Ctrl'
    });
})


.controller('LoginCtrl', function($scope, Auth) {

    $scope.data = {};

    $scope.login = function () {
    }

})
    .controller('RegisterCtrl', function($scope, Auth) {

        $scope.data = {};

        $scope.login = function () {
        }

    })
    .controller('Register2Ctrl', function($scope, Auth) {

        $scope.data = {};

        $scope.login = function () {
        }

    });