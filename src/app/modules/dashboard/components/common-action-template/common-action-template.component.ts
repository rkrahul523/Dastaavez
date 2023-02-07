import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../services/api-service';
import { ToastrService } from 'ngx-toastr';
import { ISendFile, } from '../../model/file';
import { ActiveDepartments } from '../../model/all-departments';

@Component({
  selector: 'app-common-action-template',
  templateUrl: './common-action-template.component.html',
  styleUrls: ['./common-action-template.component.scss']
})
export class CommonActionTemplateComponent implements OnInit {


  @Input() fileToSend: any;
  @Input() sendFileIdentifier: any = null;
  @Output() sentFileStatus: EventEmitter<any> = new EventEmitter();
  sendForm: FormGroup;
  items: FormArray;
  departments = ActiveDepartments;

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

    this.api.sendFile(formValue.fileInfo,this.sendFileIdentifier).subscribe((res: any) => {

      if (res && res.status) {
        this.dismissModal();
        this.emitSentFile(true, 'Sent Successfully');
      }
    })



  }


  get formData() { return <FormArray>this.sendForm.get('fileInfo') as FormArray; }



  createItem(file: any): FormGroup {

    let formData = {}
    if (this.sendFileIdentifier == ISendFile.SEND_RECEIVED_FILES) {
      formData = {
        fts_id: [file.fts_id],
        file_title: [file.file_title],
        sent_to: [null, [Validators.required]],
        comments: ['', [Validators.required]],
        receive_id: [file.receive_id]
      }
    } else {
      formData = {
        fts_id: [file.fts_id],
        file_title: [file.file_title],
        sent_to: [null, [Validators.required]],
        comments: ['', [Validators.required]]
      }
    }

    return this.fb.group(formData);
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
