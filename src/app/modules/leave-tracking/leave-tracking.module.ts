import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { LeaveDashboardComponent } from './components/leave-dashboard/leave-dashboard.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { LeaveHomeComponent } from './components/leave-home/leave-home.component';
import { FormsModule } from '@angular/forms';
import { SharedUtilityModule } from '../shared/modules/shared-util.module';
import { LeaveTrackingRoutingModule } from './leave-tracking.routing.module';
import { LeaveCardComponent } from './components/leave-card/leave-card.component';



@NgModule({
  declarations: [
    LeaveDashboardComponent,
    AddEmployeeComponent,
    LeaveHomeComponent,
    LeaveCardComponent
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    LeaveTrackingRoutingModule
     ]
})
export class LeaveTrackingModule { }
