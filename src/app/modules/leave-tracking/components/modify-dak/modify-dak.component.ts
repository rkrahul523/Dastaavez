import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { employeeList, getEmployeeName } from '../../model/employee-list';
import { ILeave } from '../../model/leave-types';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DakApiService } from '../../services/dak-api-service';
import { AuthenticationService } from 'src/app/modules/login/services/authentication.service';

@Component({
  selector: 'app-modify-dak',
  templateUrl: './modify-dak.component.html',
  styleUrls: ['./modify-dak.component.scss']
})
export class ModifyDakComponent implements OnInit {



  dakForm: FormGroup;

  names=employeeList;
  leaveTypes=[ILeave.CL,ILeave.EL]


  @Input() isModify=false;
  @Input() formValue=null;
  @Output() createdDakStatus: EventEmitter<any> = new EventEmitter();
  

  constructor(private fb: FormBuilder,
    private ngbModal: NgbActiveModal,
    private toastr: ToastrService,
    private api: DakApiService,
    private auth: AuthenticationService
    ) { }

  ngOnInit(): void {
    this.dakForm= this.fb.group({
      book:['', [Validators.required]],
      centrakDak:['', [Validators.required]],
      dak_title: ['', []],
      dak_details:[null, []],
      senderId:['', []],
      receiver:['', []],
      date:[new Date(), []],
      comments:['', []],
    })

    if(this.formValue){
      this.dakForm.patchValue(this.formValue as any)
    }
  }


  confirm(){

    if (this.dakForm.invalid) {
      this.warnToast('Please fill All Details');
       return;
     }

    const formValue=this.dakForm.value;
    const currentUser=this.auth.currentUser;
    const dakJson={
      ...formValue,
      curentUser: currentUser,
      sender:getEmployeeName(formValue.senderId)
    }

    this.api.addDak(dakJson).subscribe((res: any) => {
      if (res && res.status) {
        this.api.successToast(res.message, 'Added Dak Successfuly');
        this.dismissModal();
        this.emitCreatedFile(true,"dak created",{})
      } else {
        this.api.errorToast(res.message, 'Add Dak Error')
      }
    })
    
    
  }


  modifyDak(){
    if (this.dakForm.invalid) {
      this.warnToast('Please fill All Details');
       return;
     }

    const formValue=this.dakForm.value;
    delete formValue.comments;
    const currentUser=this.auth.currentUser
    const dakJson={
      ...formValue,
      curentUser: currentUser,
      sender:getEmployeeName(formValue.senderId)
    }

    this.api.updateDak(dakJson).subscribe((res: any) => {
      if (res && res.status) {
        this.api.successToast(res.message, 'Added Dak Successfuly');
        this.dismissModal();
        this.emitCreatedFile(true,"dak created",{})
      } else {
        this.api.errorToast(res.message, 'Add Dak Error')
      }
    })
  }




  dismissModal() {
    this.ngbModal.dismiss();
  }

  emitCreatedFile(status: boolean, message: string, data: any){
    this.createdDakStatus.emit({status, message, data})
  }

  private warnToast(message: any){
    this.toastr.info(message, 'File Info', {
      timeOut: 3000,
    });
  }

}
