/**
 * Created by jackson on 2017-3-24.
 */

angular.module('myApp.member', ['ui.router', 'oc.lazyLoad', 'myApp.services'])

.config(function($stateProvider, $ocLazyLoadProvider) {
    $stateProvider.state('/member', {
        url: '/member',
        templateUrl: 'member/memberInfo.html',
        controller: 'MemberCtrl'
    });
})


.controller('MemberCtrl', function($scope, User, Auth, $state) {
    $scope.data = User.get({action: 'profile'}, function (data) {
        $scope.data = data.user;
    });

    $scope.logout = function () {
        Auth.logout();
        $state.go('/login');
    }
});