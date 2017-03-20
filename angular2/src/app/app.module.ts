import { NgModule, Pipe, PipeTransform, }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';
import {BaiduMap} from 'angular2-baidu-map/src';
import { PopoverModule } from 'ng2-pop-over';

// used to create fake backend
import { fakeBackendProvider } from './_helpers/index';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';

import { AppComponent }  from './app.component';
import { routing }        from './app.routing';

import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { AlertService, AuthenticationService, UserService, HouseService, ServiceService, OrderService } from './_services/index';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import {HousesComponent} from "./houses/index";
import {ServicesComponent} from "./services/index";
import {OrdersComponent} from "./orders/index";
import {FilterPipe} from "./pipes/filter";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        PopoverModule,
        routing
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        HousesComponent,
        ServicesComponent,
        OrdersComponent,
        FilterPipe,
        BaiduMap,
    ],
    providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,
        HouseService,
        ServiceService,
        OrderService,

        // providers used to create fake backend
        fakeBackendProvider,
        MockBackend,
        BaseRequestOptions
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }