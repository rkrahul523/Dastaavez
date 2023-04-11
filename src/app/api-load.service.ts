import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiLocalService {


  constructor(private http:HttpClient) {
  }

  downloadpassage(name='1jan'){
      return this.http.get("/assets/passage/"+name+".json")
  }
}
