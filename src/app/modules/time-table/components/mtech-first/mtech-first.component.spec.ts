import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MtechFirstComponent } from './mtech-first.component';

describe('MtechFirstComponent', () => {
  let component: MtechFirstComponent;
  let fixture: ComponentFixture<MtechFirstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MtechFirstComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MtechFirstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
