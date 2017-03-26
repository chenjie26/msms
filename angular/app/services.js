/**
 * Created by jackson on 2017-3-24.
 */

angular.module('myApp.services', [])
    .factory('House', function (Resource, API_HOST) {
        return Resource(API_HOST + '/houses/:id', {id: '@id'}, {
            get: {
                method: 'GET'
            },
            all: {
                method: 'GET'
            },
            remove: {
                method: 'DELETE'
            }
        });
    })
    .factory('ServicePopulate', function (Resource, API_HOST) {
        return Resource(API_HOST + '/servicesWithDetails/:id', {id: '@id'}, {
            get: {
                method: 'GET'
            },
            all: {
                method: 'GET'
            },
            remove: {
                method: 'DELETE'
            }
        });
    })
    .factory('OrderPopulate', function (Resource, API_HOST) {
        return Resource(API_HOST + '/ordersWithDetails/:id', {id: '@id'}, {
            get: {
                method: 'GET'
            },
            all: {
                method: 'GET'
            },
            remove: {
                method: 'DELETE',
                isArray: true
            }
        });
    }).
    factory('WeiXin', function ($http,$window,$location) {
        $http({
            url: API_HOST + '/wechat',
            method: "get"
        }).then(
                function(res){
                    $window.wx.config(res);
                }
            );
    }).
    factory('Auth', function ($http,$window,$location) {
        $http({
            url: API_HOST + '/wechat',
            method: "get"
        }).then(
            function(res){
                $window.wx.config(res);
            }
        );
    })