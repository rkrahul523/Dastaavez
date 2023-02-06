import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { LoginRoutingModule } from './login.routing.module';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    LoginPageComponent,
    SignUpComponent
  ],
  imports: [
    CommonModule,
    NgxDocViewerModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LoginRoutingModule,
    NgSelectModule,
    
  ]
})
export class LoginModule { }
