import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyDakComponent } from './modify-dak.component';

describe('ModifyDakComponent', () => {
  let component: ModifyDakComponent;
  let fixture: ComponentFixture<ModifyDakComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyDakComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyDakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
