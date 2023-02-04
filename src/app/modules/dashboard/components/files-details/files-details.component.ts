import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-files-details',
  templateUrl: './files-details.component.html',
  styleUrls: ['./files-details.component.scss']
})
export class FilesDetailsComponent implements OnInit {

   @Input() details: {key: string, value: string}[]=[]
   @Input() users: any=[]
  d=[
    {
     key: 'Docket Number',
     value: 'NITP/doododo/dkdk'
    },
    {
     key: 'Docket Number',
     value: 'NITP/doododo/dkdk'
    },
    {
     key: 'Docket Number',
     value: 'NITP/doododo/dkdk'
    },
    {
     key: 'Docket Number',
     value: 'NITP/doododo/dkdk'
    },
    {
     key: 'Docket Number',
     value: 'NITP/doododo/dkdk'
    },
  ]

  assignForm: FormGroup;
  commentsForm: FormGroup;

  receiveButtonPressed:boolean;
  rejectButtonPressed:boolean;

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


    this.assignForm= this.fb.group({
      assignedUser: ['', [Validators.required]]
    })
    this.commentsForm= this.fb.group({
      comments: ['', [Validators.required]]
    })

  }


  receiveFiles(){
    this.receiveButtonPressed= true;

    if(this.assignForm.invalid){
      return;
    }

    if(this.commentsForm.invalid){
      this.rejectButtonPressed= true;
      return;
    }
    
  }


  rejectFiles(){
    this.rejectButtonPressed= true;

    if(this.commentsForm.invalid){
      return;
    }

  }


  dismissModal(){
    this.ngbModal.dismiss();
  }



}
