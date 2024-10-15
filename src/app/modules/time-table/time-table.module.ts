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
import { AdcFoundryComponent } from './components/adc-foundry/adc-foundry.component';
import { BtechFirstComponent } from './components/btech-first/btech-first.component';
import { BtechThirdComponent } from './components/btech-third/btech-third.component';
import { BtechFifthComponent } from './components/btech-fifth/btech-fifth.component';
import { MtechFirstComponent } from './components/mtech-first/mtech-first.component';
import { MarkEntryComponent } from './components/mark-entry/mark-entry.component';

import { ChartsModule } from 'ng2-charts';
import { DynamicChartComponent } from './components/dynamic-chart/dynamic-chart.component';
import { VerifyDataComponent } from './components/verify-data/verify-data.component';
import { XlsxCreatorComponent } from './components/xlsx-creator/xlsx-creator.component';

@NgModule({
  declarations: [
    
  
    InformationBulletinComponent,
            TimetableHomeComponent,
            AddTimetableComponent,
            AdcFoundryComponent,
            BtechFirstComponent,
            BtechThirdComponent,
            BtechFifthComponent,
            MtechFirstComponent,
            MarkEntryComponent,
            DynamicChartComponent,
            VerifyDataComponent,
            XlsxCreatorComponent
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
    ChartsModule,
    AgGridModule.withComponents([]),
     ]
})
export class TimeTableModule { }
