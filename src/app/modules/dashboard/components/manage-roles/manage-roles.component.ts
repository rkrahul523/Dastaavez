import { Component, OnInit } from '@angular/core';
import { IManageRoles, normalRoles, IUserStatus } from '../../model/user';
import { ApiService } from '../../services/api-service';
import { ActiveDepartments } from '../../model/file';

@Component({
  selector: 'app-manage-roles',
  templateUrl: './manage-roles.component.html',
  styleUrls: ['./manage-roles.component.scss']
})
export class ManageRolesComponent implements OnInit {

  searchText: any;

  currentIndex = null;
  departments = ActiveDepartments;
  statusText = {
    active: IUserStatus.ACTIVE,
    inactive: IUserStatus.INACTIVE,
  };



  roles = normalRoles;


  userData: IManageRoles[] = [
    {
      u_id: 1,
      user_name: 'rk@gmail.com',
      name: "Rahul kumar",
      role: "Supervisor",
      department: "Procurement",
      is_active: true,
    },
    {
      u_id: 2,
      user_name: 'rk@gmail.com',
      name: "rohit kumar",
      role: "Supervisor",
      department: "Procurement",
      is_active: false,
    },



  ]


  edit(index: any) {
    // this.currentIndex= index;
    const found = this.userData.findIndex(r => r.u_id == index);
    if (found > -1) {
      this.userData[found].issave = true
    }



  }
  save(index: any) {
    const found = this.userData.findIndex(r => r.u_id == index);
    if (found > -1) {
      this.userData[found].issave = false;
      this.api.updateManagedRoles(this.userData[found]).subscribe((res: any) => {
        if (res && res.status) {
          this.api.successToast(res.message, 'Manage Roles');
          this.getManageRolesData();
        }else{
          this.api.warnToast(res.message, 'Manage Roles');
        }
      })
    }
  }


  userIndex(u_id: any): number {
    const found = this.userData.findIndex(r => r.u_id == u_id);
    return found;
  }


  getManageRolesData() {
    this.api.getManagedRoles().subscribe((res: any) => {
      if (res && res.status) {
        this.userData = res.data;
      }
    })

  }

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.getManageRolesData();
  }

}
