import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { House } from '../_models/index';
import { AppSettings } from '../appSettings';

@Injectable()
export class HouseService {
    constructor(private http: Http) { }

    getAll() {
        return this.http.get(AppSettings.API_ENDPOINT + '/houses').map((response: Response) => response.json());
    }

    getById(id: number) {
        return this.http.get(AppSettings.API_ENDPOINT + '/houses/' + id).map((response: Response) => response.json());
    }

    create(house: House) {
        return this.http.post(AppSettings.API_ENDPOINT + '/houses', house).map((response: Response) => response.json());
    }

    update(house: House) {
        return this.http.put(AppSettings.API_ENDPOINT + '/houses/' + house.id, house).map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete(AppSettings.API_ENDPOINT + '/houses/' + id).map((response: Response) => response.json());
    }

    // private helper methods

    // private jwt() {
    //     create authorization header with jwt token
    //     let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    //     if (currentUser && currentUser.token) {
    //         let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
    //         return new RequestOptions({ headers: headers });
    //     }
    // }
}