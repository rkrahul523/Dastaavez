import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { employeeList } from '../../model/employee-list';
import { ILeave } from '../../model/leave-types';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-leave',
  templateUrl: './add-leave.component.html',
  styleUrls: ['./add-leave.component.scss']
})
export class AddLeaveComponent implements OnInit {

  addLeaveForm: FormGroup;
  names=employeeList;
  leaveTypes=[ILeave.CL,ILeave.EL]

  constructor(private fb: FormBuilder,
    private ngbModal: NgbActiveModal,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.addLeaveForm= this.fb.group({
      name:['', [Validators.required]],
      dateto: ['', [Validators.required]],
      datefrom:[null, [Validators.required]],
      leaveType:['', [Validators.required]],
      comments:['', [Validators.required]],
    })
  }



  dismissModal() {
    this.ngbModal.dismiss();
  }
}
