import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { API_CONFIG } from '../../../app.setings';
import { AuthService } from '../../../auth/auth.service';

@Injectable()
export class ProdutoService {

    constructor(private http: HttpClient, private auth: AuthService) { }

    getAllProducts() {
        let promise = new Promise((resolve, reject) => {
            this.http.get(API_CONFIG.url + 'products/e-m/')
            .toPromise().then(
                res => resolve(res),
                error => reject(error),
            );
        });
        return promise;
    }

    sincronizaProdutos() {
        let promise = new Promise((resolve, reject) => {
            this.http.get(API_CONFIG.url + 'sync/e-m/produtos')
            .toPromise().then(
                res => resolve(res),
                error => reject(error),
            );
        });
        return promise;
    }

    historicoSincronizacao() {
        let promise = new Promise((resolve, reject) => {
            this.http.get(API_CONFIG.url + 'historicoSincs/e-m')
            .toPromise().then(
                res => resolve(res),
                error => reject(error),
            );
        });
        return promise;
    }

    getProductById(id) {
        let promise = new Promise((resolve, reject) => {
            this.http.get(API_CONFIG.url + 'products/e-m/' + id)
            .toPromise().then(
                res => resolve(res),
                error => reject(error),
            );
        });
        return promise;
    }

    salvaAlteracaoProduto(id, data, imagens?) {
        if (imagens) {
            data.imagensForUp = imagens;
        }
        let promise = new Promise((resolve, reject) => {
            this.http.put(API_CONFIG.url + 'products/e-m/' + id, data)
            .toPromise().then(
                res => resolve(res),
                error => reject(error),
            );
        });
        return promise;
    }

    allClasses(produto, classe) {
        let promise = new Promise((resolve, reject) => {
            this.http.get(API_CONFIG.url + 'products/e-m/classes/?product=' + produto + '&class=' + classe)
            .toPromise().then(
                res => resolve(res),
                error => reject(error),
            );
        });
        return promise;
    }

}
