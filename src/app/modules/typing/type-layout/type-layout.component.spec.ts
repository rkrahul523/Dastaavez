import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeLayoutComponent } from './type-layout.component';

describe('TypeLayoutComponent', () => {
  let component: TypeLayoutComponent;
  let fixture: ComponentFixture<TypeLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
