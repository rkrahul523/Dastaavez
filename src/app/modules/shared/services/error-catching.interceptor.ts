import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from "rxjs/operators";
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../../login/services/authentication.service';

@Injectable()
export class ErrorCatchingInterceptor implements HttpInterceptor {

    constructor(private toastr: ToastrService, private authentication: AuthenticationService) {
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(request)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    if (error instanceof HttpErrorResponse) {
                        if (error.status === 401) {
                            console.log('Unauthorized User logging out');
                            this.authentication.logout();
                        }
                    }
                    let errorMsg = '';
                    if (error.error instanceof ErrorEvent) {
                        console.log('This is client side error');
                        errorMsg = `Error: ${error.error.message}`;
                    } else {
                        console.log('This is server side error');
                        errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
                    }
                    this.toastr.error('Please try Again', 'Something went wrong!!!',{ timeOut: 3000});
                    return throwError(errorMsg);
                })
            )
    }
}