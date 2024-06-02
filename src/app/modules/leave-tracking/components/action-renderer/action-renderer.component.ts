import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';

@Component({
  selector: 'app-action-renderer',
  templateUrl: './action-renderer.component.html',
  styleUrls: ['./action-renderer.component.scss']
})
export class ActionRendererDakComponent implements ICellRendererAngularComp {

  params: any;
  label: string;
  data: any;

  

  agInit(params: any): void {
    this.params = params;
    this.label = this.params.label || null;
    this.data = params.data;
  }

  refresh(params?: any): boolean {
    return true;
  }

  onClick($event: any) {
    if (!$event)
      return;

    if (this.params.onClick instanceof Function) {
      // put anything into params u want pass into parents component
      const params = {
        event: $event,
        rowData: this.params.node.data
        // ...something
      }
      this.params.onClick(params);

    }
  }

}
