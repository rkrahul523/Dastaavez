import { Component, OnInit } from '@angular/core';
import { ILeave } from '../../model/leave-types';

@Component({
  selector: 'app-leave-dashboard',
  templateUrl: './leave-dashboard.component.html',
  styleUrls: ['./leave-dashboard.component.scss']
})
export class LeaveDashboardComponent implements OnInit {

  constructor() { }

  data=[
    {
    id:1,
    name: "Rahul",
    designation:'Jr Assistant',
    leave:[{
      type:ILeave.CL,
      dateRange:{ from:'24/04/2024',to:'26/06/2024'},
      days:2
    }]
  }]

  ngOnInit(): void {
  }

}
