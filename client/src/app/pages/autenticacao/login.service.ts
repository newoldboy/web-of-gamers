import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../../app.setings';


@Injectable()
export class LoginService {

    constructor(private http: HttpClient) {}

    login(data: ParametrosLogin) {
        let promise = new Promise((resolve, reject) => {
            this.http.post(API_CONFIG.url + 'auth/', data)
                .toPromise().then(
                    res => resolve(res),
                    error => reject(error),
            );
        });
        return promise;
    }

    me() {
        let promise = new Promise((resolve, reject) => {
            this.http.get(API_CONFIG.url + 'users/token')
                .toPromise().then(
                    res => resolve(res),
                    error => reject(error),
            );
        });
        return promise;
    }
}

interface ParametrosLogin {
    usuario: string;
    senha: string;
}
