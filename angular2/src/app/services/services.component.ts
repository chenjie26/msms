import {NgModule, Component, OnInit} from '@angular/core';

import { Service, ServiceDetail } from '../_models/index';
import { ServiceService } from '../_services/index';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ServicesComponent
    ]
})


@Component({
    selector: 'services',
    templateUrl: 'services.component.html'
})


export class ServicesComponent implements OnInit{

    services: ServiceService[] = [];
    details: ServiceDetail[] = [];

    constructor(private serviceService: ServiceService) {
    }

    ngOnInit() {
        this.loadAllServices();
    }

    private loadAllServices() {
        this.serviceService.getAll().subscribe(aservices => {
            this.services = aservices.services;
            if (aservices.services.length > 0) {
                this.details = aservices.services[0].details;
            }
        });
    }

    public showDetails(service: Service) {
        this.details = service.details;
    }
}