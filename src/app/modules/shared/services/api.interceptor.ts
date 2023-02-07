import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../login/services/authentication.service';

@Injectable()
export class APIInterceptor implements HttpInterceptor {



    constructor(private authentication: AuthenticationService) { }


    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


        const token: any = localStorage.getItem('token') ? localStorage.getItem('token') : '';
        let auth ;
          

        const currentUser = this.authentication.user.getValue();
        if (currentUser) {
            auth =req.clone({
                headers: new HttpHeaders({
                    //   'Coentent-Type':  'application/json',
                    token,
                    'user': `${currentUser.u_id}`
                })
            })
        }else{
            auth = req.clone({
                headers: new HttpHeaders({
                    //   'Content-Type':  'application/json',
                    token
                })
            });
        }



        return next.handle(auth);
    }


}