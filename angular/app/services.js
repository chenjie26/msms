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
    .factory('User', function (Resource, API_HOST, LocalService) {
        return Resource(API_HOST + '/user/:action', {action: '@action'}, {
            get: {
                method: 'GET'
            },
            update: {
                method: 'PUT',
                headers: { 'Authorization': 'Bearer ' + angular.fromJson(LocalService.get('auth_token')).token }
            },
            remove: {
                method: 'DELETE'
            }
        });
    })
    .factory('ShoppingCart', function (Resource, API_HOST) {
        return Resource(API_HOST + '/shoppingCarts/:id', {id: '@id'}, {
            get: {
                method: 'GET',
                isArray: true
            },
            update: {
                method: 'PUT'
            },
            remove: {
                method: 'DELETE'
            },
            withServices: {
                method: 'get',
                isArray: true
            },
            transferToOrder: {
                method: 'POST'
            },
            addItem: {
                method: 'POST'
            },
            changeQuantity: {
                method: 'POST'
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
    })
    .factory('Order', function (Resource, API_HOST) {
        return Resource(API_HOST + '/order/:id', {id: '@id'}, {
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
    factory('WXUser', function (Resource,API_HOST) {
        return Resource(API_HOST + '/wxUser/:id', {id: '@id'}, {
            get: {
                method: 'GET'
            },
            remove: {
                method: 'DELETE',
                isArray: true
            }
        });
    })
    .factory('Auth', function($http, LocalService, AccessLevels, API_HOST) {
        return {
            authorize: function(access) {
                if(!access) {
                    return true;
                }
                if (access === AccessLevels.user) {
                    return this.isAuthenticated();
                } else {
                    return true;
                }
            },
            isAuthenticated: function() {
                return LocalService.get('auth_token');
            },
            login: function(credentials) {
                var login = $http.post(API_HOST + '/user/login', credentials);
                login.then(function(result) {
                    LocalService.set('auth_token', JSON.stringify(result.data));
                });

                // var login = $http({
                //     method: 'post',
                //     url: API_HOST + '/user/login',
                //     data: credentials
                // });
                return login;
            },
            logout: function() {
                // The backend doesn't care about logouts, delete the token and you're good to go.
                LocalService.unset('auth_token');
            },
            register: function(formData) {
                LocalService.unset('auth_token');
                var register = $http.post(API_HOST + '/user/register', formData, { headers: {access_token: formData.username}});
                register.then(function(result) {
                    if (result.data.user) {
                        LocalService.set('auth_token', JSON.stringify(result.data.user));
                    }
                });
                return register;
            },
            sendVerifyCode: function (mobile) {
                var sendCode = $http.post(API_HOST + '/laravel_sms/verify-code', {mobile: mobile}, { headers: {access_token: mobile}});
                return sendCode;
            }
        }
    })
    .factory('LocalService', function() {
        return {
            get: function(key) {
                return localStorage.getItem(key);
            },
            set: function(key, val) {
                return localStorage.setItem(key, val);
            },
            unset: function(key) {
                return localStorage.removeItem(key);
            }
        }
    })
    .factory('CurrentUser', function(LocalService) {
        return {
            user: function() {
                if (LocalService.get('auth_token')) {
                    return angular.fromJson(LocalService.get('auth_token')).user;
                } else {
                    return {};
                }
            }
        };
    })
    .factory('AuthInterceptor', function($q, $injector) {
        var LocalService = $injector.get('LocalService');

        return {
            request: function(config) {
                var token;
                if (LocalService.get('auth_token')) {
                    token = angular.fromJson(LocalService.get('auth_token')).token;
                }
                if (token) {
                    config.headers.Authorization = 'Bearer ' + token;
                }
                return config;
            },
            responseError: function(response) {
                if (response.status === 401 || response.status === 403) {
                    LocalService.unset('auth_token');
                    $injector.get('$state').go('/login');
                }
                if (response.data.message == 'Token has expired') {
                    LocalService.unset('auth_token');
                    $injector.get('$state').go('/login');
                }
                return $q.reject(response);
            }
        }
    })
    .config(function($httpProvider) {
        $httpProvider.interceptors.push('AuthInterceptor');
    });