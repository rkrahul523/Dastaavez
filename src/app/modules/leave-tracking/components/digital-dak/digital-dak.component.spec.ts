import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalDakComponent } from './digital-dak.component';

describe('DigitalDakComponent', () => {
  let component: DigitalDakComponent;
  let fixture: ComponentFixture<DigitalDakComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DigitalDakComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DigitalDakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
