import {Component, OnInit} from '@angular/core';

import { House } from '../_models/index';
import { HouseService } from '../_services/index';

@Component({
    selector: 'houses',
    templateUrl: 'houses.component.html'
})


export class HousesComponent implements OnInit{

    houses: House[] = [];
    pagePrams: Object;

    constructor(private houseService: HouseService) {
    }

    ngOnInit() {
        this.loadAllHouses();
    }

    private loadAllHouses() {
        this.houseService.getAll().subscribe(houses => {
            this.houses = houses.data;
            delete houses.data; this.
            pagePrams = houses;
        });
    }
}