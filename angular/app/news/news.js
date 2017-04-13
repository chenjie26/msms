/**
 * Created by jackson on 2017-3-24.
 */

angular.module('myApp.news', [])

.config(function config($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {

    var AccessLevels = {
        anon: 0,
        user: 1
    };

    $stateProvider.state('/news', {
        url: '/news',
        templateUrl: 'news/news.html',
        controller: 'NewsCtrl',
        data: {
            access: AccessLevels.user
        }
    });

    $stateProvider.state('/newsDetail', {
        url: '/newsDetail/:notificationId',
        templateUrl: 'news/newsDetail.html',
        controller: 'NewsDetailCtrl',
        data: {
            access: AccessLevels.user
        }
    });
})


.controller('NewsCtrl', function($scope, $state, User, Notification) {

    $scope.notifications = User.myNotification({action: 'myNotification'}, function (data) {
        $scope.notifications = data;
    });

    $scope.detail = function (notification) {
        if (notification.read_at) {
            $state.go('/newsDetail', {notificationId: notification.id});
        } else {
            Notification.markAsRead({id: notification.id, action: 'markAsRead'}, function (data) {
                console.log('mark as read', data);
                $state.go('/newsDetail', {notificationId: notification.id});
            });
        }
    }
})

.controller('NewsDetailCtrl', function($scope, $stateParams, Notification) {

    $scope.notification = Notification.get({id: $stateParams.notificationId}, function (data) {
        $scope.notification = data;
    });
});