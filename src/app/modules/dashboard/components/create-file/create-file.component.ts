import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IDepartment, ISubjectArea, IDocType, IFileStation, IPriority, shortNameDepartment } from '../../model/file';
import { ApiService } from '../../services/api-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-file',
  templateUrl: './create-file.component.html',
  styleUrls: ['./create-file.component.scss']
})
export class CreateFileComponent implements OnInit {

  @Input() actionType='Create';
  @Input() formValue=null;

  d_year=[2023]
  d_department=shortNameDepartment;

  d_fileType=['M','L'];


  @Output() createdFileStatus: EventEmitter<any> = new EventEmitter();
  @Output() createdFormValue: EventEmitter<any> = new EventEmitter();
  @Output() routeTo: EventEmitter<any> = new EventEmitter();

  constructor(
    // private ngbModal: NgbActiveModal,
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
      file_title:['', [Validators.required]],
      document_type: ['', [Validators.required]],
      subject_area:['', [Validators.required]],
      priority:['', [Validators.required]],
      file_station: ['', [Validators.required]],
      comments: ['', [Validators.required]],
      d_department: ['AC', [Validators.required]],
      d_year: [2023, [Validators.required]],
      d_fileType: ['M', [Validators.required]],
    })

    if(this.formValue){
      this.createFileForm.patchValue(this.formValue as any)
    }
  }
 

  confirm(){
    console.log(this.createFileForm.value)
    const formValue=this.createFileForm.value;
   this.api.createFile(formValue).subscribe((res: any)=>{
    if(res && res.status){
      this.dismissModal();
      this.emitCreatedFile(true, 'File Created', res.data);
      this.toastr.success(res.message, 'File Info', {
        timeOut: 3000,
      });
    }else{
      this.warnToast('Some Error Occurred');
      this.emitCreatedFile(false, 'Some Error Occurred', res.data);
    }

   })
  }


  emitCreatedFile(status: boolean, message: string, data: any){
    this.createdFileStatus.emit({status, message, data})
  }

  dismissModal(){
    // this.ngbModal.dismiss();
  }

  next(){
    if (this.createFileForm.invalid) {
     this.warnToast('Please fill All Details');
      return;
    }


    const formValue= this.createFileForm.getRawValue();
     this.createdFormValue.emit(formValue);
     this.routeTo.emit(2);
  }

  modify(){
    this.routeTo.emit(1);
  }
  



  clear() {
    const resetform= {
      file_title:[''],
      document_type: [''],
      subject_area:[''],
      priority:[''],
      file_station: [''],
      comments: [''],
      d_department: ['AC'],
      d_year: [2023],
      d_fileType: ['M'],
    }
    this.createFileForm.reset(resetform);
    // this.ngbModal.close();
  }

  private warnToast(message: any){
    this.toastr.info(message, 'File Info', {
      timeOut: 3000,
    });
  }
}
