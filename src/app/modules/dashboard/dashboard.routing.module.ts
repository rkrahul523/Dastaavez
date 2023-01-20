import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { HeaderComponent } from './components/header/header.component';
import { FileInfoComponent } from './components/file-info/file-info.component';
import { ReceiveFileComponent } from './components/receive-file/receive-file.component';

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent
  },
  {
    path: 'doc-viewer',
    component: HeaderComponent
  },
  {
    path: 'create-file',
    component: FileInfoComponent
  },
  {
    path: 'receive-file',
    component: ReceiveFileComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }