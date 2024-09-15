import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TimetableHomeComponent } from './components/timetable-home/timetable-home.component';
import { AdcFoundryComponent } from './components/adc-foundry/adc-foundry.component';

const routes: Routes = [
  {
    path: '',
    component: TimetableHomeComponent
    // component: AdcFoundryComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimeTableRoutingModule { }