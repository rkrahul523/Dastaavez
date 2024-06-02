import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationService } from '../../login/services/authentication.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class DakApiService {


    apiURL = !window.location.origin.includes('localhost') ?
        'https://bbtracker.onrender.com/'
        :
        'http://localhost:5000/';;
   
    getAllDakUrl= "getAllDak";
    updatedDakUrl="updatedDak";
    deleteDakUrl="deleteDak";
    addDakUrl="addDak";
    addCommentUrl="addComment";

    constructor(
        private http: HttpClient,
        private authentication: AuthenticationService,
        private toastr: ToastrService
    ) {

    }

    getU_id() {
        const userId: any = this.authentication.user.getValue();
        return userId.u_id;   
    }




    getAllDak() {
        return this.http.get(this.apiURL + this.getAllDakUrl, { params: { user_id: '' } })
    }
   
    // getAllDak() {
    //     return this.http.get(this.apiURL + this.getAllDakUrl, { params: { user_id: this.getU_id() } })
    // }
   

    updateDak(dakData: any) {
        return this.http.post(this.apiURL + this.updatedDakUrl, {dakData})
    }
    addDak(dakData: any) {
        return this.http.post(this.apiURL + this.addDakUrl, { dakData })
    }
    addComment(dakData: any) {
        return this.http.post(this.apiURL + this.addCommentUrl, { dakData })
    }
    deleteDak(book: any) {
        return this.http.post(this.apiURL + this.deleteDakUrl, { book })
    }



     warnToast(message: any, subtext='File Info') {
        this.toastr.info(message, subtext, {
          timeOut: 3000,
        });
      }
     successToast(message: any, subtext='File Info') {
        this.toastr.success(message, subtext, {
          timeOut: 3000,
        });
      }
     errorToast(message: any, subtext='File Info') {
        this.toastr.error(message, subtext, {
          timeOut: 3000,
        });
      }









}