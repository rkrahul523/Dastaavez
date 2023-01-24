import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IDepartment, ISubjectArea, IDocType, IFileStation, IPriority } from '../../model/file';
import { ApiService } from '../../services/api-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-file',
  templateUrl: './create-file.component.html',
  styleUrls: ['./create-file.component.scss']
})
export class CreateFileComponent implements OnInit {
  

  @Output() createdFileStatus: EventEmitter<any> = new EventEmitter();

  constructor(
    private ngbModal: NgbActiveModal,
    private fb: FormBuilder,
    private api: ApiService,
    private toastr: ToastrService
  ) { }

  priority=[
    IPriority.IMMEDIATE,
    IPriority.NORMAL,
    IPriority.URGENT,
  ]
  subjectAreas=[
    ISubjectArea.ACADEMIC,
    ISubjectArea.CONSTRUCTION,
    ISubjectArea.ESTABLISHMENT,
    ISubjectArea.FINANCE,
    ISubjectArea.PURCHASE,
  ]
  documentTypes=[
    IDocType.DOCUMENT,
    IDocType.ENVELOPE,
    IDocType.FILE,
    IDocType.LETTER,
  ]
  fileStations=[
    IFileStation.ACROSS,
    IFileStation.WITHIN
  ]


  createFileForm: FormGroup

  ngOnInit(): void {
     this.createFileForm= this.fb.group({
      file_title:[''],
      document_type: [''],
      subject_area:[''],
      priority:[''],
      file_station: [''],
      comments: [''],
    })
  }
 

  submit(){
    console.log(this.createFileForm.value)
    const formValue=this.createFileForm.value;
   this.api.createFile(formValue).subscribe((res: any)=>{
    if(res && res.status){
      this.dismissModal();
      this.emitCreatedFile(true, 'File Created');
      this.toastr.success(res.message, 'File Info', {
        timeOut: 3000,
      });
    }else{
      this.emitCreatedFile(false, 'Some Error Occurred');
    }

   })
  }


  emitCreatedFile(status: boolean, message: string){
    this.createdFileStatus.emit({status, message})
  }

  dismissModal(){
    this.ngbModal.dismiss();
  }



  close() {
    this.ngbModal.close();
  }
}
