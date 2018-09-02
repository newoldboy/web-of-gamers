import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { API_CONFIG } from '../../app.setings';

@Injectable()
export class DashboardService {

    constructor(private http: HttpClient) {}

    buscaRelatorioVendas (id) {
        let promise = new Promise((resolve, reject) => {
            this.http.get(API_CONFIG.url + 'dashboard/v/' + id)
            .toPromise().then(
                res => resolve(res),
                error => reject(error),
            );
        });
        return promise;
    }

    buscaRelatorioTrocas (id) {
        let promise = new Promise((resolve, reject) => {
            this.http.get(API_CONFIG.url + 'dashboard/t/' + id)
            .toPromise().then(
                res => resolve(res),
                error => reject(error),
            );
        });
        return promise;
    }
}
