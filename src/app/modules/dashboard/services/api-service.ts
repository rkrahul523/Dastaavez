import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationService } from '../../login/services/authentication.service';
import { ISendFile } from '../model/file';

@Injectable({
    providedIn: 'root'
})
export class ApiService {


    apiURL = !window.location.origin.includes('localhost') ?
        'https://bbtracker.onrender.com/'
        :
        'http://localhost:5000/';;
    postOtpurl = 'postotp';
    postMoburl = 'postmob';
    startOrderurl = 'startOrder'//'startOrder';
    getImageURL = 'image';
    getallorder = 'getallRecords'
    someError = 'someError';
    getCreatedFilesURL = 'get-created-files';
    createFileURL = 'create-file';
    trackFileURL = 'track-file';
    getUerDetailsURL = 'get-user-details';
    sendFileURL = 'send-files';
    receiveFileURL = 'receive-file';//   fts_id, user_id';
    getReceivedFileURL = 'get-received-files';//   fts_id, user_id';
    sendReceivedFileURL = 'send-received-files';//   fts_id, user_id';




    constructor(private http: HttpClient,
        private authentication: AuthenticationService
    ) {

    }

    getU_id() {
        const userId: any = this.authentication.user.getValue();
        return userId.u_id;
    }




    getCreatedFileDetails() {
        return this.http.get(this.apiURL + this.getCreatedFilesURL, { params: { user_id: this.getU_id() } })
    }

    createFile(data: any) {
        return this.http.post(this.apiURL + this.createFileURL, { ...data, user_id: this.getU_id() })
    }
    trackFile(fts_id: any) {
        return this.http.post(this.apiURL + this.trackFileURL, { fts_id })
    }
    sendFile(file_info: any, identifier = null) {
        if (identifier && identifier == ISendFile.SEND_RECEIVED_FILES) {
            return this.http.post(this.apiURL + this.sendReceivedFileURL, { file_info, u_id: this.getU_id() })
        } else {
            return this.http.post(this.apiURL + this.sendFileURL, { file_info, u_id: this.getU_id() })
        }
    }
    receiveFile(fts_id: any) {
        return this.http.post(this.apiURL + this.receiveFileURL, { fts_id, user_id: this.getU_id() })
    }
    getReceivedFileDetails() {
        return this.http.get(this.apiURL + this.getReceivedFileURL, { params: { user_id: this.getU_id() } })
    }









}