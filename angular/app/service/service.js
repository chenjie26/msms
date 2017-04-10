/**
 * Created by jackson on 2017-3-24.
 */

angular.module('myApp.service', ['ui.router', 'oc.lazyLoad', 'myApp.services'])

.config(function($stateProvider, $ocLazyLoadProvider) {
    var AccessLevels = {
        anon: 0,
        user: 1
    };

    $stateProvider.state('/service', {
        url: '/service',
        templateUrl: 'service/service.html',
        controller: 'ServiceCtrl',
        data: {
            access: AccessLevels.user
        }
    });
})


.controller('ServiceCtrl', function($scope, ServicePopulate, ShoppingCart, WXUser) {

    $scope.services = [];
    $scope.details = [];
    $scope.showServices = [];
    $scope.items = [];

    $scope.services = ServicePopulate.all({}, function (data) {
        $scope.services = data.services;

        $scope.items = ShoppingCart.withServices({id: 'withServices'}, function (data) {
            $scope.items = data;
        });

        angular.forEach($scope.services, function(service, index) {
            var showService = {service: service, image: '', key: ''};
            if (service.name == '桶装水') {
                showService.image = 'images/main/s1.png';
                showService.key = '1';
            } else if (service.name == '客房维修') {
                showService.image = 'images/main/s2.png';
                showService.key = '2';
            } else if (service.name == '洗衣机干洗') {
                showService.image = 'images/main/s3.png';
                showService.key = '3';
            } else if (service.name == '床品') {
                showService.image = 'images/main/s4.png';
                showService.key = '4';
            } else if (service.name == '婴儿照看') {
                showService.image = 'images/main/s5.png';
                showService.key = '5';
            }

            $scope.showServices.push(showService);
        });


        if (data.services.length > 0) {
            $scope.details = this.details = data.services[0].details;
        }

    });

    $scope.showDetails = function (service) {
        $scope.details = service.service.details;

        angular.forEach($scope.showServices, function(showService, index) {
            if (showService.service.name == '桶装水') {
                showService.image = 'images/main/s1.png';
                showService.key = '1';
            } else if (showService.service.name == '客房维修') {
                showService.image = 'images/main/s2.png';
                showService.key = '2';
            } else if (showService.service.name == '洗衣机干洗') {
                showService.image = 'images/main/s3.png';
                showService.key = '3';
            } else if (showService.service.name == '床品') {
                showService.image = 'images/main/s4.png';
                showService.key = '4';
            } else if (showService.service.name == '婴儿照看') {
                showService.image = 'images/main/s5.png';
                showService.key = '5';
            }
        });

        service.image = 'images/main/s' + service.key + service.key +'.png';
    };


    $scope.save_item = function (service) {
        var addItem = new ShoppingCart();
        addItem.service_detail_id = service.id;
        ShoppingCart.addItem({id: 'addItem', service_detail_id: service.id, quantity: 1}, function (data) {
            if (data.shopping_cart.quantity <= 1) {
                $scope.items.push(addItem);
            }
            mui.toast('服务添加成功',{ duration:'short', type:'div' });
        });
    }

});

function _tab(btns,items){
    $(btns).each(function(n){
        $(this).bind("click", function(){
            $(btns).each(function(m){
                $(this).find('img').attr('src','images/main/s'+(m+1)+'.png');
            });
            $(this).find('img').attr('src','images/main/s'+(n+1)+''+(n+1)+'.png');
            $(items).each(function(){
                $(this).hide();
            });
            $(items).eq(n).fadeIn();
        })
    });
}

function submit_order(){
    mui.toast('订单提交成功',{ duration:'short', type:'div' })
}