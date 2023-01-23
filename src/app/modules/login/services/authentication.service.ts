import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpResponse, HttpClientModule, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  fakeUsername: string = "username";
  fakePassword: string = "password";
  apiURL=!window.location.origin.includes('localhost') ?
  'https://bbtracker.onrender.com/'
  :
  'http://localhost:5000/';;
  loginURL='validate-user-details';

  constructor(private http: HttpClient) { }

  login(loginData: any): Observable<any> {
    // Mock a successful call to an API server.

      return of({ status: true, message: 'Login successful' , token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ1'});
    
      return of(new HttpResponse({ status: 401 }));
    

    return this.http.post(this.apiURL+this.loginURL, { loginData})
 
  }

  logout(): void {
    localStorage.removeItem("token");
  }

  isUserLoggedIn(): boolean {
    if (localStorage.getItem("token") != null) {
      return true;
    }
    return false;
  }
}