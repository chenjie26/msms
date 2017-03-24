/**
 * Created by jackson on 2017-3-24.
 */

angular.module('myApp.order', ['ui.router', 'oc.lazyLoad', 'myApp.services'])

.config(function($stateProvider, $ocLazyLoadProvider) {
    $stateProvider.state('/order', {
        url: '/order',
        templateUrl: 'order/order.html',
        controller: 'OrderCtrl'
    });
})


.controller('OrderCtrl', function($scope, OrderPopulate) {

    $scope.services = [];
    $scope.details = [];

    $scope.orders = OrderPopulate.all({}, function (data) {
        $scope.orders = data.orders;

    });
});