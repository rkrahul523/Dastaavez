import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentFilesComponent } from './department-files.component';

describe('DepartmentFilesComponent', () => {
  let component: DepartmentFilesComponent;
  let fixture: ComponentFixture<DepartmentFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartmentFilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
