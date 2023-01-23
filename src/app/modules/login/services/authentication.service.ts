import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { HttpResponse, HttpClientModule, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ROUTE_PATH } from '../../shared/models/route-path';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

 
  apiURL=!window.location.origin.includes('localhost') ?
  'https://bbtracker.onrender.com/'
  :
  'http://localhost:5000/';;
  loginURL='validate-user-details';

  user=new BehaviorSubject<any>(null);
  username=null;
  getUerDetailsURL='get-user-details';

  constructor(
    private http: HttpClient,
    private route: Router
    ) { }

  login(loginData: any): Observable<any> {
    // Mock a successful call to an API server.
    this.username= loginData.username;
    return this.http.post(this.apiURL+this.loginURL,  loginData)
 
  }

  logout(): void {
    localStorage.removeItem("token");
    this.route.navigateByUrl(`/${ROUTE_PATH.LOGIN}`)
  }

  isUserLoggedIn(): boolean {
    if (localStorage.getItem("token") != null) {
      return true;
    }
    return false;
  }

  getUserDetails(token : any){
      console.log("in get userdetails", this.username )
    return this.http.post(this.apiURL+this.getUerDetailsURL, { token, username:this.username })
   }
}