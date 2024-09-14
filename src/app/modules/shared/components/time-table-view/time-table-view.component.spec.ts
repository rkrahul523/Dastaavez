import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeTableViewComponent } from './time-table-view.component';

describe('TimeTableViewComponent', () => {
  let component: TimeTableViewComponent;
  let fixture: ComponentFixture<TimeTableViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeTableViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeTableViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
