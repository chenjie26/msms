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
        },
        resolve: {
          loadPlugin: function ($ocLazyLoad) {
            return $ocLazyLoad.load([
              {
                files: ['http://apps.bdimg.com/libs/jquery/1.6.4/jquery.js']
              }
            ]);
          }
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

    $scope.remove = function (notification) {

        var btnArray = ['确认', '取消'];
        mui.confirm('确认删除该条记录？', '', btnArray, function(e) {
            if (e.index == 0) {
                Notification.remove({id: notification.id}, function (data) {
                    console.log('delete notification', data);
                    $scope.notifications.splice(notification, 1);
                });
            } else {
                console.log('no');
            }
        });
    }


    $scope.onFinish = function () {
        mui.init();
    };


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