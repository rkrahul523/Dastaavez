import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api-service';
import { ToastrService } from 'ngx-toastr';
import { IUiAction, IModalAction, allModalActionText } from '../../model/action';
import { df } from '../receive-file/xt';

@Component({
  selector: 'app-files-details',
  templateUrl: './files-details.component.html',
  styleUrls: ['./files-details.component.scss']
})
export class FilesDetailsComponent implements OnInit {

  @Input() details: { key: string, value: string }[] =[];
  @Input() fts_id: string;
  @Input() receiveId=null;
  @Input() modalActionType: IModalAction = IModalAction.RECEIVED;
  @Output() fileStatus: EventEmitter<any> = new EventEmitter();

  allModalActions= allModalActionText;

  @Input() users: any = []
  

  assignForm: FormGroup;
  commentsForm: FormGroup;

  receiveButtonPressed: boolean;
  rejectButtonPressed: boolean;

  //   users=[ 
  //     {
  //     name: 'Rahul kumar',
  //     u_id: 2
  //   },
  //     {
  //     name: 'suresh kumar',
  //     u_id: 4
  //   },
  // ];

  constructor(
    private ngbModal: NgbActiveModal,
    private fb: FormBuilder,
    private api: ApiService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {


    this.assignForm = this.fb.group({
      assignedUser: ['', [Validators.required]]
    })
    this.commentsForm = this.fb.group({
      comments: ['', [Validators.required]]
    })

  }


  receiveFiles() {
    this.receiveButtonPressed = true;

    if (this.assignForm.invalid) {
      return;
    }

    if (this.commentsForm.invalid) {
      this.rejectButtonPressed = true;
      return;
    }
    this.commonActionFunc(IUiAction.RECEIVED);
  }



  commonActionFunc(action: IUiAction) {
    const receiveFileData = {
      fts_id: this.fts_id,
      comments: this.commentsForm.value.comments,
      assignedUser: this.assignForm.value.assignedUser,
      action,
      receiveId : this.receiveId
    }
    this.api.receiveFile(receiveFileData).subscribe((res: any) => {
      if (res) {
        if (res.status) {
          this.api.successToast(res.message, 'File Info');
          this.emitFileStatus(res.status, res.message, action);
          this.dismissModal();
        } else {
          this.api.errorToast(res.message, 'Receive File');
        }
      }
    })
  }


  rejectFiles() {
    this.rejectButtonPressed = true;
    if (this.commentsForm.invalid) {
      return;
    }
    this.commonActionFunc(IUiAction.REJECTED);
  }


  dismissModal() {
    this.ngbModal.dismiss();
  }


  emitFileStatus(status: boolean, message: string, action: string) {
    this.fileStatus.emit({ status, message, action })
  }

}
