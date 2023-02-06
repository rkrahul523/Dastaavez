import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { IFileSection, fileSectionText } from '../../model/section';
import { fileStatusText } from '../../model/file';

@Component({
  selector: 'app-action-renderer',
  templateUrl: './action-renderer.component.html',
  styleUrls: ['./action-renderer.component.scss']
})
export class ActionRendererComponent implements ICellRendererAngularComp {

  params: any;
  label: string;
  data: any;

  fileStatusText = fileStatusText;

  fileSection: any = fileSectionText;

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
