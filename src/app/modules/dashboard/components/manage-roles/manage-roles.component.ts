import { Component, OnInit } from '@angular/core';
import { IManageRoles, normalRoles, IUserStatus } from '../../model/user';
import { ApiService } from '../../services/api-service';
import { AuthenticationService } from 'src/app/modules/login/services/authentication.service';
import { accessToEditDepartment, avlRolesForDirector, avlRolesForSupervisor, activeRoleText } from '../../utils/manage-role-access';
import { ActiveDepartments } from '../../model/all-departments';

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


  currentUser= this.authentication.user;
  allRolesText=activeRoleText

  updateDepartmentAccess= accessToEditDepartment;
  fundedRoleForDirector= avlRolesForDirector;
  fundedRoleForSupervisor= avlRolesForSupervisor;




  userData: IManageRoles[] = [
    // {
    //   u_id: 1,
    //   user_name: 'rk@gmail.com',
    //   name: "Rahul kumar",
    //   role: "Supervisor",
    //   department: "Procurement",
    //   is_active: true,
    // },
    // {
    //   u_id: 2,
    //   user_name: 'rk@gmail.com',
    //   name: "rohit kumar",
    //   role: "Supervisor",
    //   department: "Procurement",
    //   is_active: false,
    // },
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
      if(this.checkNull(this.userData[found])){
        this.userData[found].issave = false;
        this.api.updateManagedRoles(this.userData[found]).subscribe((res: any) => {
          if (res && res.status) {
            this.api.successToast(res.message, 'Manage Roles');
            this.getManageRolesData();
          }else{
            this.api.warnToast(res.message, 'Manage Roles');
          }
        })
      }else{
        this.api.errorToast('Department and Role can\'t be Empty', 'Error');
      }
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

  constructor(private api: ApiService, private authentication: AuthenticationService) { }

  ngOnInit(): void {
    this.getManageRolesData();
  }


  checkNull(data: any){
    return data.role  && data.department;
  }

}
