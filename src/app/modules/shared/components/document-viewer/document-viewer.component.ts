import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-document-viewer',
  templateUrl: './document-viewer.component.html',
  styleUrls: ['./document-viewer.component.scss']
})
export class DocumentViewerComponent implements OnInit {

  viewer = 'google';
  selectedType = 'pdf'; //'docx';
  doc = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';


  constructor() { }

  ngOnInit(): void {
  }

}
