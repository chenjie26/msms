import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverModule } from 'ng2-pop-over';

import '../assets/app.css';
import  '../assets/css/main.css';
import '../assets/css/mui.css';
import '../assets/js/mui.js';
// import '../assets/css/bootstrap.min.css'

@Component({
    moduleId: module.id.toString(),
    selector: 'app',
    templateUrl: 'app.component.html',
    styles: [`
        .nmui-bar
        {
            position: fixed;
            z-index: 10;
            right: 0;
            left: 0;
        
            height: 44px;
            padding-right: 10px;
            padding-left: 10px;
        
            border-bottom: 0;
            background-color: #f7f7f7;
            -webkit-box-shadow: 0 0 1px rgba(0, 0, 0, .85);
                    box-shadow: 0 0 1px rgba(0, 0, 0, .85);
        
            -webkit-backface-visibility: hidden;
                    backface-visibility: hidden;
        }
        .nmui-bar-tab
        {
            bottom: 0;
        
            display: table;
        
            width: 100%;
            height: 50px;
            padding: 0;
        
            table-layout: fixed;
        
            border-top: 0;
            border-bottom: 0;
        
            /*-webkit-touch-callout: none;*/
        }
        .nmui-bar-tab .nmui-tab-item
        {
            display: table-cell;
            overflow: hidden;
        
            width: 1%;
            height: 50px;
        
            text-align: center;
            vertical-align: middle;
            white-space: nowrap;
            text-overflow: ellipsis;
        
            color: #929292;
        }
        .nmui-bar-tab .nmui-tab-item.nmui-active
        {
            color: #007aff;
        }
        .nmui-bar-tab .nmui-tab-item .nmui-icon
        {
            top: 3px;
        
            width: 24px;
            height: 24px;
            padding-top: 0;
            padding-bottom: 0;
        }
        .nmui-bar-tab .nmui-tab-item .nmui-icon ~ .nmui-tab-label
        {
            font-size: 11px;
        
            display: block;
            overflow: hidden;
        
            text-overflow: ellipsis;
        }
        .nmui-bar-tab .nmui-tab-item .nmui-icon:active
        {
            background: none;
        }
    `]
})

export class AppComponent {

    barActive: 'mui-active';

    constructor(
        private router: Router) { }

    toRouter(url: string) {
        this.router.navigate([url]);
    }
}