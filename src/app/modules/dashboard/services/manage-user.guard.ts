import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../login/services/authentication.service';
import { ApiService } from './api-service';
import { routeAccessToManageUsers } from '../utils/manage-user-access';

@Injectable({
    providedIn: 'root'
})
export class ManageUserGuard implements CanActivate {


    constructor(
        private authService: AuthenticationService,
        private api: ApiService,
        private router: Router
    ) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return new Promise((resolve, reject) => {
            const currentUser = this.authService.user.getValue();
            if (currentUser) {
                if (routeAccessToManageUsers.includes(currentUser.role)) {
                    resolve(true);
                } else {
                    this.api.errorToast('You are not authorised to access Manage Users', 'Unauthorised')
                    reject(true);
                }
            } else {
                this.authService.logout();
                // this.api.errorToast('You are not authorised to access Manage Users', 'Unauthorised')
                resolve(false);
            }
        });
    }

}







