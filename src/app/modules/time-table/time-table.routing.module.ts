import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TimetableHomeComponent } from './components/timetable-home/timetable-home.component';
import { AdcFoundryComponent } from './components/adc-foundry/adc-foundry.component';
import { InformationBulletinComponent } from './components/information-bulletin/information-bulletin.component';
import { MarkEntryComponent } from './components/mark-entry/mark-entry.component';
import { XlsxCreatorComponent } from './components/xlsx-creator/xlsx-creator.component';

const routes: Routes = [
  {
    path: 'markentry',
    component: MarkEntryComponent
    // component: TimetableHomeComponent
    // component: AdcFoundryComponent
  },
  {
    path:'xlsx',
    component: XlsxCreatorComponent

  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimeTableRoutingModule { }