import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpInterceptor, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(public auth: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const headers = request.headers.set('Authorization', ((this.auth.getToken()) ? 'Bearer ' + this.auth.getToken() : ''));
        const requestClone = request.clone({
            headers,
        });
        return next.handle(requestClone)
            .do((event: any) => {
                if (event instanceof HttpResponse) {
                    const elapsed = Date.now();
                    console.log(`Request for ${request.urlWithParams} took ${elapsed} ms.`);
                }
            });
    }
}
