import { Component, AfterViewInit, OnInit } from '@angular/core';
import { ROUTES } from './menu-items';
import { RouteInfo } from './sidebar.metadata';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ROUTE_PATH } from '../../models/route-path';
import { AuthenticationService } from 'src/app/modules/login/services/authentication.service';
import { routeAccessToManageUsers } from 'src/app/modules/dashboard/utils/manage-user-access';
import { routeAccessToManageRoles } from 'src/app/modules/dashboard/utils/manage-role-access';
//declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  showMenu = '';
  showSubMenu = '';
  public sidebarnavItems: RouteInfo[] = [];

  manageRoles = {
    path: `${ROUTE_PATH.DASHBOARD}/${ROUTE_PATH.MANAGE_ROLES}`,
    title: 'Manage Roles',
    icon: 'bi bi-bank',
    class: '',
    extralink: false,
    submenu: []
  }

  manageUsers = {
    path: `${ROUTE_PATH.DASHBOARD}/${ROUTE_PATH.MANAGE_USERS}`,
    title: 'Manage Users',
    icon: 'bi bi-people',
    class: '',
    extralink: false,
    submenu: []
  }



  // this is for the open close
  addExpandClass(element: string) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private authentication: AuthenticationService
  ) { }

  // End open close
  ngOnInit() {
    this.sidebarnavItems = ROUTES;


    this.authentication.user.subscribe((userData: any) => {
      if (userData && userData.role) {
        const updated = [...ROUTES];
        if (routeAccessToManageUsers.includes(userData.role)) {
          updated.splice(4,0,this.manageUsers);
        }
        if (routeAccessToManageRoles.includes(userData.role)) {
          updated.splice(4,0,this.manageRoles);
        }
        this.sidebarnavItems = [...updated];

      }
    })
  }
}
