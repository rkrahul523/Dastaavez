import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoaderService } from '../services/loader.service';
import { finalize } from 'rxjs/operators';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(private loaderService: LoaderService) {
  }

  bypassedURL=['validate-user-details'];

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
console.log("request", this.bypassedURL.includes(request.url))


      if(!this.bypassedURL.some(url=> request.url.includes(url))){
        this.loaderService.show();
      }
     

     return next.handle(request).pipe(
           finalize(() => this.loaderService.hide()),
     );
  }
}
