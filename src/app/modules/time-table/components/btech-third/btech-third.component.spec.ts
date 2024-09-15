import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtechThirdComponent } from './btech-third.component';

describe('BtechThirdComponent', () => {
  let component: BtechThirdComponent;
  let fixture: ComponentFixture<BtechThirdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtechThirdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BtechThirdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
