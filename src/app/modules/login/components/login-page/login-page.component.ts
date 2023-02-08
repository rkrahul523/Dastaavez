import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { ROUTE_PATH } from 'src/app/modules/shared/models/route-path';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  fieldTextType: boolean;

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password:  ['', Validators.required],
  });

  loaderFlag: boolean;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private toastr: ToastrService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
  }

  login(): void {
    this.loaderFlag = true;
    if (this.loginForm.invalid) {
      this.toastr.error('Please fill Correct Details', 'Login Error', {
        timeOut: 3000,
      });
      this.loaderFlag = false;
      return;
    }


    this.authenticationService.login(this.loginForm.value).subscribe((res: any) => {
      this.loaderFlag = false;
      if (res && res.status) {
        localStorage.setItem("token", res.token)
        this.authenticationService.user.next(res.data);
        this.toastr.success(res.message, 'Login success', {
          timeOut: 2000,
        });
        setTimeout(()=>{
          this.router.navigate([`/${ROUTE_PATH.HOME}`]);
        })
      
      } else {
        this.toastr.error(res.message, 'Login Error', {
          timeOut: 3000,
        });
      }





    },
    (err)=>{
      this.loaderFlag = false;
    });
  }








//   if(results.rows[0].password == password) {
//   res.status(201).json({ status: true, message: 'Login successful' });
// } else {
//   res.status(201).json({ status: false, message: 'Wrong Password' });
// }
// } else {
//   res.status(201).json({ status: false, message: 'User doesnot exist' });

toggleFieldTextType() {
  this.fieldTextType = !this.fieldTextType;
}


}
