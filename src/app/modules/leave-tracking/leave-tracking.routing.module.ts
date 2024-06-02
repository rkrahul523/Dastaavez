import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LeaveDashboardComponent } from './components/leave-dashboard/leave-dashboard.component';
import { DigitalDakComponent } from './components/digital-dak/digital-dak.component';

const routes: Routes = [
  {
    path: '',
    component: DigitalDakComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaveTrackingRoutingModule { }