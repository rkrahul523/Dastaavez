import { Component, OnInit } from '@angular/core';
import { IManageRoles, IRegisteredStatus } from '../../model/user';
import { ApiService } from '../../services/api-service';
import { AuthenticationService } from 'src/app/modules/login/services/authentication.service';
import { accessToDelete } from '../../utils/manage-user-access';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {

  statusText = {
    Created: IRegisteredStatus.CREATED,
    Approved: IRegisteredStatus.APPROVED,
    Rejected: IRegisteredStatus.REJECTED,
    Deleted: IRegisteredStatus.DELETED
  }

 // { "u_id": 1, "name": "Rahul kumar", "department": "Academic", "user_name": "test", "role": "Director" }

 deleteAccess= accessToDelete;

  currentUser= this.authentication.user;

  searchText: any;

  constructor(private api: ApiService, private authentication: AuthenticationService) { }

  userData: IManageRoles[] = [
    {
      u_id: 1,
      user_name: 'rk@gmail.com',
      name: "Rahul kumar",
      role: "Supervisor",
      department: "Procurement",
      status: 'Approved'
    },
    {
      u_id: 1,
      user_name: 'rk@gmail.com',
      name: "Rahul kumar",
      role: "Supervisor",
      department: "Procurement",
      status: 'Created'
    },

  ]

  ngOnInit(): void {
    this.getAllUserDetails();
  }

  getAllUserDetails() {
    this.api.getAllUserDetails().subscribe((res: any) => {
      if (res && res.status) {
        this.userData = res.data;
      }
    })
  }


  updateUserAction(details: IManageRoles) {

    this.api.approveUsers(details).subscribe((res: any) => {
      if (res && res.status) {
        this.api.successToast(res.message, 'Update Users');
        this.getAllUserDetails()
      } else {
        this.api.warnToast(res.message, 'Update Users');
      }
    })
  }

  approve(uId: any) {
    const found = this.userData.findIndex(r => r.u_id == uId);
    if (found > -1) {
      let data = { ...this.userData[found], status: IRegisteredStatus.APPROVED }
      this.updateUserAction(data);
    }
  }

  reject(uId: any) {
    const found = this.userData.findIndex(r => r.u_id == uId);
    if (found > -1) {
      let data = { ...this.userData[found], status: IRegisteredStatus.REJECTED }
      this.updateUserAction(data);
    }
  }
  deleteUser(uId: any) {
    const found = this.userData.findIndex(r => r.u_id == uId);
    if (found > -1) {
      let data = { ...this.userData[found], status: IRegisteredStatus.DELETED }
      this.updateUserAction(data);
    }
  }

  userIndex(u_id: any): number {
    const found = this.userData.findIndex(r => r.u_id == u_id);
    return found;
  }

}
