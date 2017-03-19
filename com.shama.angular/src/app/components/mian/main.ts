import { Component, OnInit} from '@angular/core';
import {BaiduMap, OfflineOptions, ControlAnchor, NavigationControlType} from 'angular2-baidu-map/src';

@Component({
    moduleId: module.id,
    selector: 'main',
    templateUrl: './main.html',
    styles: [`
        baidu-map{
            border-radius: 15px;
            height: 180px;
            width: 100%;
            box-shadow: 1px 1px 8px #aaa;
            margin-bottom:20px;
            display: block;
        }
    `]
})
export class MainComponent implements OnInit {

    opts: any;
    offlineOpts: OfflineOptions;

    ngOnInit() {
        this.opts = {
            center: {
                longitude: 121.45127,
                latitude: 31.198934
            },
            zoom: 19,
            markers: [{
                longitude: 121.45127,
                latitude: 31.198934,
                title: '莎玛(上海徐家汇)',
                content: '徐汇区辛耕路81弄永新世纪11和12号楼',
                enableDragging: false,
                enableScrollWheelZoom: true,
                enableKeyboard: true,
                enableDoubleClickZoom: true
            }]
        };

        this.offlineOpts = {
            retryInterval: 5000,
            txt: 'NO-NETWORK'
        };
    }

    loadMap(e: any) {
        console.log(e);//e here is the instance of BMap.Map
    }

    clickMarker(marker: any){
        console.log('The clicked marker is', marker.getPosition());
    }

}
