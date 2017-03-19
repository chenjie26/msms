import { Component } from '@angular/core';
import { PopoverModule } from 'ng2-pop-over';

import '../assets/app.css';
import  '../assets/css/main.css'
import '../assets/css/mui.min.css'
import '../assets/js/mui.js'

@Component({
    moduleId: module.id.toString(),
    selector: 'app',
    templateUrl: 'app.component.html'
})

export class AppComponent {

    barActive: 'mui-active';
}