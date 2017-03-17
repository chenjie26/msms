import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {BaiduMap} from 'angular2-baidu-map/src';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    BaiduMap,
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
