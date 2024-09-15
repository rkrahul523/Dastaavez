import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtechFifthComponent } from './btech-fifth.component';

describe('BtechFifthComponent', () => {
  let component: BtechFifthComponent;
  let fixture: ComponentFixture<BtechFifthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtechFifthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BtechFifthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
