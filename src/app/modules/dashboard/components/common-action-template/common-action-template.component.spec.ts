import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonActionTemplateComponent } from './common-action-template.component';

describe('CommonActionTemplateComponent', () => {
  let component: CommonActionTemplateComponent;
  let fixture: ComponentFixture<CommonActionTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonActionTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonActionTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
