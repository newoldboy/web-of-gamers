import { Injectable } from '@angular/core';
import { Headers, URLSearchParams } from '@angular/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthService {
    cookieValue = 'UNKNOWN';

    constructor(private router: Router, private cookieService: CookieService) { }

    public setCredentials(user) {
        console.log(user);
        let settings = {
            session: {
                usuario: {
                    codigo: user._id,
                    role: user.role,
                    usuario: user.usuario,
                    nome: user.name,
                    provider: user.provider
                },
                datetimelastsession: new Date(),
            },
        };
        this.cookieService.set('settings', JSON.stringify(settings), 2, '/');
        return true;
    }

    public setToken(data) {
        if (data) {
            this.cookieService.set('token', data.token, 2, '/');
            return true;
        }
        return false;
    }

    public getCredentials(): Usuario | undefined {
        let settings = this.cookieService.get('settings');
        return (settings ? JSON.parse(settings) : undefined);
    }

    public getToken() {
        let token = this.cookieService.get('token');
        return (token ? token : undefined);
    }

    public isUserAuthenticated() {
        let token = this.cookieService.get('token');
        return (token ? true : false);
    }

    public clearCredentials() {
        this.cookieService.deleteAll();
        this.router.navigate(['./login']);
    }

    private setParametros(parametros) {
        let params = new URLSearchParams();
        for (let key in parametros) {
            if (parametros.hasOwnProperty(key)) {
                let element = parametros[key];
                params.set(key, element);
            }
        }
        return params;
    }
}

export interface Usuario {
    session: {
        datetimelastsession: Date,
        usuario: { }
    };
}
