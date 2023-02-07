import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationService } from '../../login/services/authentication.service';
import { ISendFile } from '../model/file';
import { ToastrService } from 'ngx-toastr';

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
    getDashboardDataUrl = 'get-dasboard-data';
    updateManageRoleUrl = 'update-manage-roles';
    getManageRoleUrl = 'get-manage-roles';
    getAllUserDetailsUrl = 'get-all-user-details';
    approveUsersUrl = 'approve-users';
    checkFileUrl = 'check-file-to-receive';
    getLastCommentUrl = 'get-last-comment';
    deleteFileUrl = 'delete-file';
    signUpUrl = 'signUpUser';

    
    

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




    getCreatedFileDetails() {
        return this.http.get(this.apiURL + this.getCreatedFilesURL, { params: { user_id: this.getU_id() } })
    }
    getDashboardData() {
        return this.http.get(this.apiURL + this.getDashboardDataUrl)
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
    receiveFile(data: any) {
        return this.http.post(this.apiURL + this.receiveFileURL, { ...data, user_id: this.getU_id() })
    }
    getReceivedFileDetails() {
        return this.http.get(this.apiURL + this.getReceivedFileURL, { params: { user_id: this.getU_id() } })
    }
    getManagedRoles() {
        return this.http.get(this.apiURL + this.getManageRoleUrl, { params: { user_id: this.getU_id() } })
    }
    updateManagedRoles(data: any) {
        return this.http.post(this.apiURL + this.updateManageRoleUrl, data)
    }
    getAllUserDetails() {
        return this.http.get(this.apiURL + this.getAllUserDetailsUrl, { params: { user_id: this.getU_id() } })
    }
    approveUsers(data: any) {
        return this.http.post(this.apiURL + this.approveUsersUrl,  { ...data,  user_id: this.getU_id()})
    }
    checkFile(data: any) {
        return this.http.post(this.apiURL + this.checkFileUrl, { ...data,  user_id: this.getU_id()} )
    }

    getLastComment(data: any) {
        return this.http.post(this.apiURL + this.getLastCommentUrl, { ...data,  user_id: this.getU_id()} )
    }
    deleteFile(data: any) {
        return this.http.post(this.apiURL + this.deleteFileUrl, { ...data,  user_id: this.getU_id()} )
    }
    signUpUser(data: any) {
        return this.http.post(this.apiURL + this.signUpUrl, { ...data} )
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