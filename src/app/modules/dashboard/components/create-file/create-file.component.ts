import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-file',
  templateUrl: './create-file.component.html',
  styleUrls: ['./create-file.component.scss']
})
export class CreateFileComponent implements OnInit {

  constructor(
    private ngbModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
  }
  close() {
    this.ngbModal.close();
  }
}
