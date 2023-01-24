import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../services/api-service';
import { ToastrService } from 'ngx-toastr';
import { IDepartment } from '../../model/file';

@Component({
  selector: 'app-common-action-template',
  templateUrl: './common-action-template.component.html',
  styleUrls: ['./common-action-template.component.scss']
})
export class CommonActionTemplateComponent implements OnInit {


  @Input() fileToSend: any;
  @Output() sentFileStatus: EventEmitter<any> = new EventEmitter();
  sendForm: FormGroup;
  items: FormArray;
  departments=[
    IDepartment.ACADEMIC,
    IDepartment.ACCOUNTS,
    IDepartment.ESTABLISHMENT,
    IDepartment.PROCUREMENT,
  ]

  constructor(private fb: FormBuilder,
    private ngbModal: NgbActiveModal,
    private api: ApiService,
    private toastr: ToastrService

  ) { }

  ngOnInit(): void {
    this.sendForm = new FormGroup({
      fileInfo: new FormArray([])
    });
    this.createForm();

  }

  createForm() {
    if (this.fileToSend && Array.isArray(this.fileToSend) && this.fileToSend.length) {
      this.fileToSend.forEach((file: any) => this.addItem(file));
    } else {
      this.warnToast('Some Error Occured');
      this.dismissModal();
    }

  }


  sendFileDetails() {
    if (this.sendForm.invalid) {
      this.warnToast('Please fill all details');
      return;
    }

    const formValue = this.sendForm.value;

    this.api.sendFile(formValue.fileInfo).subscribe((res: any)=>{

      if(res && res.status){
        this.dismissModal();
        this.emitSentFile(true,'Sent Successfully');
      }
    })



  }


  get formData() {  return <FormArray>this.sendForm.get('fileInfo') as FormArray;  }



  createItem(file: any): FormGroup {
    return this.fb.group({
      fts_id: [file.fts_id],
      file_title: [file.file_title],
      sent_to: ['', [Validators.required]],
      comments: ['', [Validators.required]]
    });
  }


  emitSentFile(status: boolean, message: string) {
    this.sentFileStatus.emit({ status, message })
  }

  dismissModal() {
    this.ngbModal.dismiss();
  }

  addItem(file: any): void {
    this.items = this.sendForm.get('fileInfo') as FormArray;
    this.items.push(this.createItem(file));
  }

  private warnToast(message: any) {
    this.toastr.info(message, 'File Info', {
      timeOut: 3000,
    });
  }

}
