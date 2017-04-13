/**
 * Created by jackson on 2017-3-24.
 */

angular.module('myApp.order', [])

.config(function config($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {

    var AccessLevels = {
        anon: 0,
        user: 1
    };

    $stateProvider.state('/order', {
        url: '/order',
        templateUrl: 'order/order.html',
        controller: 'OrderCtrl',
        data: {
            access: AccessLevels.user
        }
    });
})


.controller('OrderCtrl', function($scope, OrderPopulate, LocalService) {

    $scope.services = [];
    $scope.details = [];

    console.log(" token is ", LocalService.get('auth_token'));
    $scope.orders = OrderPopulate.all({}, function (data) {
        $scope.orders = data.orders;

    });
});