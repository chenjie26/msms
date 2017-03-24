/**
 * Created by jackson on 2017-3-24.
 */

angular.module('myApp.house', ['ui.router', 'oc.lazyLoad', 'myApp.services'])

.config(function($stateProvider, $ocLazyLoadProvider) {
    $stateProvider.state('/house', {
        url: '/house',
        templateUrl: 'house/house.html',
        controller: 'HouseCtrl'
    });
})


.controller('HouseCtrl', function($scope, House) {

    scrollView();
    $scope.houses = [];

    $scope.houses = House.all({}, function (data) {
        $scope.houses = data.data;
    });

    $scope.showDetail = function(src){
        $('#pic').attr('src', 'images/main/' + src)
        $('#detail-html').css('top', -10000);
        $('.shadow').show();
        $('#detail-html').show(10,function(){
            setTimeout(function(){
                var top = ($(window).height() - $('#detail-html').height()) / 2;
                $('#detail-html').css('top', top-20);
            },200);
        });


    };
});


function scrollView() {
    var gallery = mui('.mui-slider');
    gallery.slider({
        interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
    });
}