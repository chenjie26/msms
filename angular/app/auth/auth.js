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


.controller('LoginCtrl', function($scope, $state, Auth, LocalService) {

    $scope.data = {};

    $scope.login = function () {
        Auth.login($scope.data).then(function (result) {
            var token = LocalService.get('auth_token');
            // console.log("token is ", token);
            $state.go('/order');
            //$state.go('index.main');
        }, function (data) {
            alert("账号或密码不对");
            $scope.errorMsg = "账号或密码不对";
        });
    }

})
    .controller('RegisterCtrl', function($scope, $state, $interval, Auth, LocalService) {

        $scope.paracont = "获取验证码";
        $scope.paraclass = "but_null";
        $scope.paraevent = true;

        $scope.data = {};

        $scope.sendVerifyCode = function () {
            Auth.sendVerifyCode($scope.data.username).then(function (result) {
                if (result.data.success) {
                    var second = 60,
                        timePromise = undefined;

                    timePromise = $interval(function(){
                        if(second<=0){
                            $interval.cancel(timePromise);
                            timePromise = undefined;

                            second = 60;
                            $scope.paracont = "重发验证码";
                            $scope.paraclass = "but_null";
                            $scope.paraevent = true;
                        }else{
                            $scope.paracont = second + "秒后可重发";
                            $scope.paraclass = "not but_null";
                            second--;

                        }
                    },1000,100);
                } else {
                    alert("验证码发送失败");
                }
            });
        };

        $scope.register = function () {
            // $state.go('/register2');
            Auth.register($scope.data).then(function (result) {
                if (!result.data.user) {
                    alert("注册失败");
                } else {
                    var token = LocalService.get('auth_token');
                    console.log("token is ", token);
                    $state.go('/register2');
                }
                //$state.go('index.main');
            }, function (data) {
                console.log(data);
                $scope.errorMsg = data.message;
            });
        }

    })
    .controller('Register2Ctrl', function($scope, Auth, User, $state) {

        $scope.data = {};

        $scope.updateInfo = function () {
            User.update($scope.data, function (data) {
                $state.go('/order');
            });
        }

    });