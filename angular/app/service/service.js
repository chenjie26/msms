/**
 * Created by jackson on 2017-3-24.
 */

angular.module('myApp.service', ['ui.router', 'oc.lazyLoad', 'myApp.services'])

.config(function($stateProvider, $ocLazyLoadProvider) {
    $stateProvider.state('/service', {
        url: '/service',
        templateUrl: 'service/service.html',
        controller: 'ServiceCtrl'
    });
})


.controller('ServiceCtrl', function($scope, ServicePopulate) {

    $scope.services = [];
    $scope.details = [];

    $scope.services = ServicePopulate.all({}, function (data) {
        $scope.services = data.services;

        if (data.services.length > 0) {
            $scope.details = this.details = data.services[0].details;
        }

    });

    $scope.showDetails = function (service) {
        $scope.details = service.details;
    }

});