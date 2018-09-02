import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { API_CONFIG } from '../../../app.setings';

@Injectable()
export class ServicosService {

    constructor(private http: HttpClient) { }

    getAllServicos() {
        let promise = new Promise((resolve, reject) => {
            this.http.get(API_CONFIG.url + 'services/e-m/')
            .toPromise().then(
                res => resolve(res),
                error => reject(error),
            );
        });
        return promise;
    }

    salvaServico(servico) {
        let promise = new Promise((resolve, reject) => {
            this.http.post(API_CONFIG.url + 'services/e-m/', servico)
            .toPromise().then(
                res => resolve(res),
                error => reject(error),
            );
        });
        return promise;
    }

    editaServico(servico) {
        let promise = new Promise((resolve, reject) => {
            this.http.put(API_CONFIG.url + 'services/e-m/' + servico._id, servico)
            .toPromise().then(
                res => resolve(res),
                error => reject(error),
            );
        });
        return promise;
    }

    deleteServico(id) {
        let promise = new Promise((resolve, reject) => {
            this.http.delete(API_CONFIG.url + 'services/e-m/' + id)
            .toPromise().then(
                res => resolve(res),
                error => reject(error),
            );
        });
        return promise;
    }
}
