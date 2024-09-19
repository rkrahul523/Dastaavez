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
export class TimeTableApiService {


    apiURL = !window.location.origin.includes('localhost') ?
        'https://big-basket-tracker.onrender.com/'
        :
        'http://localhost:5000/';;


        getAllTimeTable='get-all-time-table'

    addTimeTable='add-time-table'

    constructor(
        private http: HttpClient,
        private authentication: AuthenticationService,
        private toastr: ToastrService
    ) {

    }

    getU_id() {
        const userId: any = this.authentication.user.getValue();
        return userId.userId;   
    }

    addTime(timeData: any) {
        return this.http.post(this.apiURL + this.addTimeTable, { timeData })
    }




    getAlltime() {
      return this.http.get('assets/docs/time-table.json');
        return this.http.get(this.apiURL + this.getAllTimeTable)
    }
   
    // getAllDak() {
    //     return this.http.get(this.apiURL + this.getAllDakUrl, { params: { user_id: this.getU_id() } })
    // }
   


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