import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverModule } from 'ng2-pop-over';

import '../assets/app.css';
import  '../assets/css/main.css';
import '../assets/css/mui.min.css';
import '../assets/js/mui.js';
import '../assets/css/bootstrap.min.css'

@Component({
    moduleId: module.id.toString(),
    selector: 'app',
    templateUrl: 'app.component.html'
})

export class AppComponent {

    barActive: 'mui-active';

    constructor(
        private router: Router) { }

    toRouter(url: string) {
        this.router.navigate([url]);
    }
}