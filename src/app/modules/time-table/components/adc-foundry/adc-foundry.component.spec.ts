import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdcFoundryComponent } from './adc-foundry.component';

describe('AdcFoundryComponent', () => {
  let component: AdcFoundryComponent;
  let fixture: ComponentFixture<AdcFoundryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdcFoundryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdcFoundryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
