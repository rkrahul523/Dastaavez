import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbNavModule, NgbModule, NgbDropdownModule, NgbModalModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { LeaveDashboardComponent } from './components/leave-dashboard/leave-dashboard.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { LeaveHomeComponent } from './components/leave-home/leave-home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedUtilityModule } from '../shared/modules/shared-util.module';
import { LeaveTrackingRoutingModule } from './leave-tracking.routing.module';
import { LeaveCardComponent } from './components/leave-card/leave-card.component';
import { HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { AddLeaveComponent } from './components/add-leave/add-leave.component';
import { DigitalDakComponent } from './components/digital-dak/digital-dak.component';
import { AgGridModule } from '@ag-grid-community/angular';
import { ActionRendererDakComponent } from './components/action-renderer/action-renderer.component';
import { DateRangeFilterDakComponent } from './components/date-range-filter/date-range-filter.component';
import { ModifyDakComponent } from './components/modify-dak/modify-dak.component';
import { ViewDakComponent } from './components/view-dak/view-dak.component';
import { CommentsRendererComponent } from './components/comments-renderer/comments-renderer.component';



@NgModule({
  declarations: [
    LeaveDashboardComponent,
    AddEmployeeComponent,
    LeaveHomeComponent,
    LeaveCardComponent,
    AddLeaveComponent,
    DigitalDakComponent,
    ActionRendererDakComponent,
    DateRangeFilterDakComponent,
    ModifyDakComponent,
    ViewDakComponent,
    CommentsRendererComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    LeaveTrackingRoutingModule,
    ReactiveFormsModule,
    SharedUtilityModule,
    NgbModule,
    HttpClientModule,
    NgbDropdownModule,
    NgbNavModule,
    NgbModalModule,
    NgSelectModule,
    NgbDatepickerModule,
    AgGridModule.withComponents([]),
     ]
})
export class LeaveTrackingModule { }
