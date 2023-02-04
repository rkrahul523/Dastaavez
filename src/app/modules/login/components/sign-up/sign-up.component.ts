import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActiveDepartments } from 'src/app/modules/dashboard/model/file';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  departments = ActiveDepartments;

  signupForm = this.fb.group({
    username: ['', Validators.required],
    password:  ['', Validators.required],
    department:  ['', Validators.required],
    name: ['', Validators.required]
  });

  loaderFlag: boolean;


  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }


  signup(){
    
  }

}
