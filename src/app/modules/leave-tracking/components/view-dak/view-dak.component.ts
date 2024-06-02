import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DakApiService } from '../../services/dak-api-service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/modules/login/services/authentication.service';

@Component({
  selector: 'app-view-dak',
  templateUrl: './view-dak.component.html',
  styleUrls: ['./view-dak.component.scss']
})
export class ViewDakComponent implements OnInit {

  @Input() dakData:any=null;
  @Output() createdDakStatus: EventEmitter<any> = new EventEmitter();
  

commentsForm: FormGroup;


  constructor(
    private ngbModal: NgbActiveModal,
    private fb: FormBuilder,
    private api: DakApiService,
    private toastr: ToastrService,
    private auth: AuthenticationService
  ) { }


  ngOnInit(): void {

    this.commentsForm = this.fb.group({
      comment: ['', [Validators.required]]
    });

    // if(this.formValue){
    //   this.commentsForm.patchValue(this.formValue as any)
    // }
  }


  dismissModal() {
    this.ngbModal.dismiss();
  }

  addcomment(){
      if (this.commentsForm.invalid) {
        return;
      }
      const form={...this.commentsForm.value,curentUser:this.auth.currentUser, book:this.dakData.book};
      this.api.addComment(form).subscribe((res: any) => {
        if (res && res.status) {
          this.api.successToast(res.message, 'Added Comment Successfuly');
          this.dismissModal();
          this.emitCreatedFile(true,"Comment added",{})
        } else {
          this.api.errorToast(res.message, 'Add comment Error')
        }
      })
  

  }


  emitCreatedFile(status: boolean, message: string, data: any){
    this.createdDakStatus.emit({status, message, data})
  }


}
