import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  viewer = 'google';
  selectedType = 'jpg'; //'docx';
  doc = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';
  // doc = 'https://files.fm/down.php?i=axwasezb&n=SSaD.docx';
  //doc = 'https://files.fm/down.php?i=sdymh2y6';
//doc='https://picsum.photos/200/300'
  // https://github.com/guigrpa/docx-templates#readme


  constructor() { }

  ngOnInit(): void {
  }

}
