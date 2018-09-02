import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { API_CONFIG } from '../../../app.setings';

@Injectable()
export class PratoService {

    constructor(private http: HttpClient) { }

    getAllPratos() {
        let promise = new Promise((resolve, reject) => {
            this.http.get(API_CONFIG.url + 'plates/e-m/')
            .toPromise().then(
                res => resolve(res),
                error => reject(error),
            );
        });
        return promise;
    }

    salvaPrato(prato) {
        let promise = new Promise((resolve, reject) => {
            this.http.post(API_CONFIG.url + 'plates/e-m/', prato)
            .toPromise().then(
                res => resolve(res),
                error => reject(error),
            );
        });
        return promise;
    }

    editaPrato(prato) {
        let promise = new Promise((resolve, reject) => {
            this.http.put(API_CONFIG.url + 'plates/e-m/' + prato._id, prato)
            .toPromise().then(
                res => resolve(res),
                error => reject(error),
            );
        });
        return promise;
    }

    deletePrato(id) {
        let promise = new Promise((resolve, reject) => {
            this.http.delete(API_CONFIG.url + 'plates/e-m/' + id)
            .toPromise().then(
                res => resolve(res),
                error => reject(error),
            );
        });
        return promise;
    }
}
