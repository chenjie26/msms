import {NgModule, Component, OnInit} from '@angular/core';

import { Order, OrderDetail } from '../_models/index';
import { OrderService } from '../_services/index';
import { CommonModule } from '@angular/common';
import {FilterPipe} from '../pipes/filter';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        OrdersComponent
    ]
})


@Component({
    selector: 'orders',
    templateUrl: 'orders.component.html'
})


export class OrdersComponent implements OnInit{

    orders: Order[] = [];

    constructor(private orderService: OrderService) {
    }

    ngOnInit() {
        this.loadAllOrders();
    }

    private loadAllOrders() {
        this.orderService.getAll().subscribe(orders => {
            this.orders = orders.orders;
        });
    }
}