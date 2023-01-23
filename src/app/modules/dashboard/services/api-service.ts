import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


   apiURL=!window.location.origin.includes('localhost') ?
   'https://bbtracker.onrender.com/'
   :
   'http://localhost:5000/';;
   postOtpurl='postotp';
   postMoburl='postmob';
   startOrderurl='startOrder'//'startOrder';
   getImageURL='image';
   getallorder= 'getallRecords'
   someError= 'someError';
   getCreatedFilesURL='get-created-files';
   createFileURL='create-file';
   trackFileURL='track-file';



   constructor(private http: HttpClient){

   }



   getCreatedFileDetails(){
       return this.http.get(this.apiURL+this.getCreatedFilesURL, {params : {user_id : 1}})
   }

   createFile(data: any){
       return this.http.post(this.apiURL+this.createFileURL, { ...data, user_id : 1})
   }
   trackFile(fts_id: any){
       return this.http.post(this.apiURL+this.trackFileURL, { fts_id })
   }



}