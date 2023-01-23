import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackFileComponent } from './track-file.component';

describe('TrackFileComponent', () => {
  let component: TrackFileComponent;
  let fixture: ComponentFixture<TrackFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
