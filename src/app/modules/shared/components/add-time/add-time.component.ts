import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { employeeList } from 'src/app/modules/leave-tracking/model/employee-list';
import { courses } from 'src/app/modules/time-table/model/courses';
import { TimeTableApiService } from 'src/app/modules/time-table/services/time-api-service';

@Component({
  selector: 'app-add-time',
  templateUrl: './add-time.component.html',
  styleUrls: ['./add-time.component.scss']
})
export class AddTimeComponent implements OnInit {

  form: FormGroup;
  days=["MON","TUE","WED","THU","FRI"]
  names=employeeList;
  courses=courses

  constructor(private fb: FormBuilder,private api: TimeTableApiService) { }

  ngOnInit(): void {
    // Initialize the form with default values
    this.form = this.fb.group({
      day:[],
      course:[],
      head: [],
      short: [],
      sub: [],
      startTime: [10],
      endTime: [11]
    });
  }

  onSubmit(): void {
    const timedata=this.form.value;


    this.api.addTime(timedata).subscribe((res: any) => {
      if (res && res.status) {
        this.api.successToast(res.message, 'Added Dak Successfuly');
        //this.dismissModal();
      //  this.emitCreatedFile(true,"dak created",{})
      } else {
        //this.api.errorToast(res.message, 'Add Dak Error')
      }
    })
  }



}
