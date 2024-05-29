import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LeaveDashboardComponent } from './components/leave-dashboard/leave-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: LeaveDashboardComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaveTrackingRoutingModule { }