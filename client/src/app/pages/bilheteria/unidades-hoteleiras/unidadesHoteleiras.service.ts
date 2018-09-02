import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../../../app.setings';

@Injectable()
export class UnidadesHoteleirasService {

    constructor(private http: HttpClient) { }

    salvaGrupo(form) {
        let promise = new Promise((resolve, reject) => {
            this.http.post(API_CONFIG.url + 'uh/', form)
                .toPromise().then(
                    res => resolve(res),
                    error => reject(error),
            );
        });
        return promise;
    }

    listaGrupos() {
        let promise = new Promise((resolve, reject) => {
            this.http.get(API_CONFIG.url + 'uh/')
                .toPromise().then(
                    res => resolve(res),
                    error => reject(error),
            );
        });
        return promise;
    }

    // deletaUsuarios(id) {
    //     let promise = new Promise((resolve, reject) => {
    //         this.http.delete(API_CONFIG.url + 'usuarios/' + id)
    //             .toPromise().then(
    //                 res => resolve(res),
    //                 error => reject(error),
    //         );
    //     });
    //     return promise;
    // }
}
