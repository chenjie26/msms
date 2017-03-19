import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Service } from '../_models/index';
import { AppSettings } from '../appSettings';

@Injectable()
export class ServiceService {
    constructor(private http: Http) { }

    getAll() {
        return this.http.get(AppSettings.API_ENDPOINT + '/servicesWithDetails').map((response: Response) => response.json());
    }

    getById(id: number) {
        return this.http.get(AppSettings.API_ENDPOINT + '/services/' + id).map((response: Response) => response.json());
    }

    create(service: Service) {
        return this.http.post(AppSettings.API_ENDPOINT + '/services', service).map((response: Response) => response.json());
    }

    update(service: Service) {
        return this.http.put(AppSettings.API_ENDPOINT + '/services/' + service.id, service).map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete(AppSettings.API_ENDPOINT + '/services/' + id).map((response: Response) => response.json());
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