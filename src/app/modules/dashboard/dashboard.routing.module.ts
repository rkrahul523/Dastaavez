import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { HeaderComponent } from './components/header/header.component';
import { FileInfoComponent } from './components/file-info/file-info.component';
import { ReceiveFileComponent } from './components/receive-file/receive-file.component';
import { TrackFileComponent } from './components/track-file/track-file.component';
import { ROUTE_PATH } from '../shared/models/route-path';
import { ManageRolesComponent } from './components/manage-roles/manage-roles.component';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent
  },
  {
    path: ROUTE_PATH.TRACK_FILE,
    component: TrackFileComponent
  },
  {
    path: ROUTE_PATH.CREATE_FILE,
    component: FileInfoComponent
  },
  {
    path: ROUTE_PATH.RECEIVE_FILE,
    component: ReceiveFileComponent
  },
  {
    path: ROUTE_PATH.MANAGE_ROLES,
    component: ManageRolesComponent
  },
  {
    path: ROUTE_PATH.MANAGE_USERS,
    component: ManageUsersComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }