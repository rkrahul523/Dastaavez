import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDakComponent } from './view-dak.component';

describe('ViewDakComponent', () => {
  let component: ViewDakComponent;
  let fixture: ComponentFixture<ViewDakComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDakComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
