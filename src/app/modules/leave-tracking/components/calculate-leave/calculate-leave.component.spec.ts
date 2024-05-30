import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculateLeaveComponent } from './calculate-leave.component';

describe('CalculateLeaveComponent', () => {
  let component: CalculateLeaveComponent;
  let fixture: ComponentFixture<CalculateLeaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculateLeaveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculateLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
