import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { DocumentViewerComponent } from '../components/document-viewer/document-viewer.component';
import { CustomDateTimePipe } from '../pipes/date-time.pipe';


@NgModule({
  declarations: [
    DocumentViewerComponent,
     CustomDateTimePipe
  ],
  imports: [
    CommonModule,
    NgxDocViewerModule,
  ],
  exports:[DocumentViewerComponent, CustomDateTimePipe]
})
export class SharedUtilityModule { }
