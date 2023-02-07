import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/modules/dashboard/services/api-service';
import { Router } from '@angular/router';
import { ActiveDepartments } from 'src/app/modules/dashboard/model/all-departments';

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
    department:  [null, Validators.required],
    name: ['', Validators.required],
    terms: [false, Validators.requiredTrue],
  });

  loaderFlag: boolean;


  constructor(private fb: FormBuilder, private api: ApiService, private route: Router) { }

  ngOnInit(): void {
  }


  signup(){  
    if (this.signupForm.invalid) {
      this.api.errorToast('Please fill Correct Details', 'Sign Up Error');
      // this.loaderFlag = false;
      return;
    }

    this.api.signUpUser(this.signupForm.value).subscribe((res: any) => {
      if (res) {
        if (res.status) {
          this.api.successToast(res.message, res.headerText);
          this.route.navigateByUrl('/login');
        } else {
          this.api.errorToast(res.message, res.headerText);
        }
      }
    })
  }

}
