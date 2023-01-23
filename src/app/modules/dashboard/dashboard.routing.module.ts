import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { HeaderComponent } from './components/header/header.component';
import { FileInfoComponent } from './components/file-info/file-info.component';
import { ReceiveFileComponent } from './components/receive-file/receive-file.component';
import { TrackFileComponent } from './components/track-file/track-file.component';
import { ROUTE_PATH } from '../shared/models/route-path';

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
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }