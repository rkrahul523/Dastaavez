import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbNavModule, NgbModule, NgbDropdownModule, NgbModalModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedUtilityModule } from '../shared/modules/shared-util.module';
import { HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { AgGridModule } from '@ag-grid-community/angular';
import { TimeTableRoutingModule } from './time-table.routing.module';
import { InformationBulletinComponent } from './components/information-bulletin/information-bulletin.component';
import { TimetableHomeComponent } from './components/timetable-home/timetable-home.component';
import { AddTimetableComponent } from './components/add-timetable/add-timetable.component';



@NgModule({
  declarations: [
    
  
    InformationBulletinComponent,
            TimetableHomeComponent,
            AddTimetableComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TimeTableRoutingModule,
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
export class TimeTableModule { }
