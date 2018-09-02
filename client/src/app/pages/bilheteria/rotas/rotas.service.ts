import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { API_CONFIG } from '../../../app.setings';

@Injectable()
export class RotasService {

    constructor(private http: HttpClient) { }

    getAllRotas() {
        let promise = new Promise((resolve, reject) => {
            this.http.get(API_CONFIG.url + 'routes/e-m/')
            .toPromise().then(
                res => resolve(res),
                error => reject(error),
            );
        });
        return promise;
    }

    salvaRota(rota) {
        let promise = new Promise((resolve, reject) => {
            this.http.post(API_CONFIG.url + 'routes/e-m/', rota)
            .toPromise().then(
                res => resolve(res),
                error => reject(error),
            );
        });
        return promise;
    }

    editaRota(rota) {
        let promise = new Promise((resolve, reject) => {
            this.http.put(API_CONFIG.url + 'routes/e-m/' + rota._id, rota)
            .toPromise().then(
                res => resolve(res),
                error => reject(error),
            );
        });
        return promise;
    }

    deleteRota(id) {
        let promise = new Promise((resolve, reject) => {
            this.http.delete(API_CONFIG.url + 'routes/e-m/' + id)
            .toPromise().then(
                res => resolve(res),
                error => reject(error),
            );
        });
        return promise;
    }
}
