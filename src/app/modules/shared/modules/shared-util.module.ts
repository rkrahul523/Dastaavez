import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { DocumentViewerComponent } from '../components/document-viewer/document-viewer.component';


@NgModule({
  declarations: [
    DocumentViewerComponent
  ],
  imports: [
    CommonModule,
    NgxDocViewerModule,
  ],
  exports:[DocumentViewerComponent]
})
export class SharedUtilityModule { }
