import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TimetableHomeComponent } from './components/timetable-home/timetable-home.component';
import { AdcFoundryComponent } from './components/adc-foundry/adc-foundry.component';
import { InformationBulletinComponent } from './components/information-bulletin/information-bulletin.component';
import { MarkEntryComponent } from './components/mark-entry/mark-entry.component';

const routes: Routes = [
  {
    path: '',
    component: MarkEntryComponent
    // component: TimetableHomeComponent
    // component: AdcFoundryComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimeTableRoutingModule { }