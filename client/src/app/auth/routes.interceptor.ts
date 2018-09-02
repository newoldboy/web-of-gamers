import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable()
export class RoutesInterceptor implements CanActivate, CanActivateChild {

    constructor(private auth: AuthService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.validatorAuthenticated();
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.validatorAuthenticated();
    }

    validatorAuthenticated(): boolean {
        if (this.auth.isUserAuthenticated()) {
            document.getElementById('nb-global-spinner').style.display = 'none';
            return true;
        }
        this.auth.clearCredentials();
        return false;
    }
}
