import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { DocumentViewerComponent } from '../components/document-viewer/document-viewer.component';
import { CustomDateTimePipe } from '../pipes/date-time.pipe';
import { TimeTableViewComponent } from '../components/time-table-view/time-table-view.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddTimeComponent } from '../components/add-time/add-time.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    DocumentViewerComponent,
     CustomDateTimePipe,
     TimeTableViewComponent,
     AddTimeComponent
  ],
  imports: [
    CommonModule,
    NgxDocViewerModule,
    NgbModule,
    ReactiveFormsModule,
    NgSelectModule
  ],
  exports:[DocumentViewerComponent, CustomDateTimePipe]
})
export class SharedUtilityModule { }
