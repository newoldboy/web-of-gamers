import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../../../app.setings';

@Injectable()
export class UsuariosService {
    
    constructor(private http: HttpClient) {}
    
    listaUsuarios () {
        let promise = new Promise((resolve, reject) => {
            this.http.get(API_CONFIG.url + 'usuarios/')
            .toPromise().then(
                res => resolve(res),
                error => reject(error),
            );
        }); 
        return promise;
    }
    
    usuario(cod){
        let promise = new Promise((resolve, reject) => {
            this.http.get(API_CONFIG.url + 'usuarios/' + cod)
            .toPromise().then(
                res => resolve(res),
                error => reject(error),
            );
        });
        return promise;
    }
    
    salvaUsuario (dados) {
        let promise = new Promise((resolve, reject) => {
            this.http.post(API_CONFIG.url + 'usuarios/', dados)
            .toPromise().then(
                res => resolve(res),
                error => reject(error),
            );
        });
        return promise;
    }
    
    deletaUsuarios (id) {
        let promise = new Promise((resolve, reject) => {
            this.http.delete(API_CONFIG.url + 'usuarios/' + id)
            .toPromise().then(
                res => resolve(res),
                error => reject(error),
            );
        });
        return promise;
    }
}
