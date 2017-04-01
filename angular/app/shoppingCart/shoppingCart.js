/**
 * Created by jackson on 2017-3-24.
 */

angular.module('myApp.shoppingCart', [])

.config(function config($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {

    var AccessLevels = {
        anon: 0,
        user: 1
    };

    $stateProvider.state('/shoppingCart', {
        url: '/shoppingCart',
        templateUrl: 'shoppingCart/shoppingCart.html',
        controller: 'ShoppingCartCtrl',
        data: {
            access: AccessLevels.user
        }
    });
})


.controller('ShoppingCartCtrl', function($scope, $state, ShoppingCart) {

    $scope.services = [];
    $scope.details = [];

    $scope.carts = ShoppingCart.withServices({id: 'withServices'}, function (data) {
        $scope.carts = data;
    });

    $scope.addQuantity = function (cart) {
        cart.quantity = cart.quantity + 1;
        ShoppingCart.changeQuantity({id: 'changeQuantity', updateId: cart.id, quantity: cart.quantity});
    };

    $scope.removeQuantity = function (cart) {
        if (cart.quantity <= 1) {
            cart.quantity = cart.quantity - 1;
            // cart.remove({id: cart.id});
        } else {
            cart.quantity = cart.quantity - 1;
            ShoppingCart.changeQuantity({id: 'changeQuantity', updateId: cart.id, quantity: cart.quantity});
        }
    };

    $scope.$watch('carts', function (newVal, oldVal) {
        console.log('new value is ', newVal);
        angular.forEach(newVal, function(item, index) {
            if (item.quantity == 0) {
                $scope.carts.splice(index, 1);
                ShoppingCart.remove({id: item.id});
            }
        });
    }, true);

    $scope.submit_order = function () {
        var ids = [];
        angular.forEach($scope.carts, function(item, index) {
            ids.push(item.id);
        });
        ShoppingCart.transferToOrder({id: 'transferToOrder', ids: ids}, function (data) {
            console.log('create order is', data);
            $state.go('/order');
            mui.toast('订单生成成功',{ duration:'short', type:'div' });
        })
    }
});