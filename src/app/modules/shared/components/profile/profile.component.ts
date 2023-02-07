import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/app/modules/login/services/authentication.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {


  currentUser= this.authentication.user;
  //of({ "u_id": 1, "name": "Rahul kumar", "department": "Academic", "user_name": "test", "role": "Director" , last_updated: '24/4/2022'})
  //
  // u_id,password,name, department, user_name,role,status,is_active, last_updated

  constructor(
    private ngbModal: NgbActiveModal,
    private authentication: AuthenticationService
  ) { }

  ngOnInit(): void {
  }

  dismissModal() {
    this.ngbModal.dismiss();
  }

  logout(){
    this.authentication.logout();
  }

}
