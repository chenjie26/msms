'use strict';

angular.module('myApp.home', ['ui.router', 'oc.lazyLoad'])

.config(function($stateProvider, $ocLazyLoadProvider) {
  $stateProvider.state('/home', {
    url: '/',
    templateUrl: 'home/home.html',
    controller: 'HomeCtrl',
    // resolve: {
    //   loadPlugin: function ($ocLazyLoad) {
    //     return $ocLazyLoad.load([
    //       {
    //         files: ['/js/mui.js']
    //       }
    //     ]);
    //   }
    // }
  });
})

.controller('HomeCtrl', function($scope) {

  scrollView();
  initMap();

  $scope.about = function () {
    mui(".shadow")[0].style.display = 'block';
    mui("#about-html")[0].style.display = 'block';
  };

  $scope.contact = function () {
    mui(".shadow")[0].style.display = 'block';
    mui("#about-html")[0].style.display = 'block';
  };
});


function scrollView() {
  var gallery = mui('.mui-slider');
  gallery.slider({
    interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
  });
}

var map;
function initMap(){
  createMap();//创建地图
  setMapEvent();//设置地图事件
  //addMapControl();//向地图添加控件
  addMapOverlay();//向地图添加覆盖物
}
function createMap(){
  map = new BMap.Map("_map");
  map.centerAndZoom(new BMap.Point(121.45127,31.198934),19);
}
function setMapEvent(){
  map.enableScrollWheelZoom();
  map.enableKeyboard();
  map.enableDragging();
  map.enableDoubleClickZoom()
}
function addClickHandler(target,window){
  target.addEventListener("click",function(){
    target.openInfoWindow(window);
  });
}
function addMapOverlay(){
  var markers = [
    {content:"徐汇区辛耕路81弄永新世纪11和12号楼",title:"莎玛(上海徐家汇)",imageOffset: {width:0,height:3},position:{lat:31.199158,lng:121.451458}}
  ];
  for(var index = 0; index < markers.length; index++ ){
    var point = new BMap.Point(markers[index].position.lng,markers[index].position.lat);
    var marker = new BMap.Marker(point,{icon:new BMap.Icon("http://api.map.baidu.com/lbsapi/createmap/images/icon.png",new BMap.Size(20,25),{
      imageOffset: new BMap.Size(markers[index].imageOffset.width,markers[index].imageOffset.height)
    })});
    var label = new BMap.Label(markers[index].title,{offset: new BMap.Size(25,5)});
    var opts = {
      width: 200,
      title: markers[index].title,
      enableMessage: false
    };
    var infoWindow = new BMap.InfoWindow(markers[index].content,opts);
    marker.setLabel(label);
    addClickHandler(marker,infoWindow);
    map.addOverlay(marker);
  };
}
//向地图添加控件
function addMapControl(){
  var scaleControl = new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT});
  scaleControl.setUnit(BMAP_UNIT_IMPERIAL);
  map.addControl(scaleControl);
  var navControl = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT,type:BMAP_NAVIGATION_CONTROL_LARGE});
  map.addControl(navControl);
  var overviewControl = new BMap.OverviewMapControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT,isOpen:true});
  map.addControl(overviewControl);
}