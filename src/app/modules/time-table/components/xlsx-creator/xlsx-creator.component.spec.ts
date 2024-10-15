import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XlsxCreatorComponent } from './xlsx-creator.component';

describe('XlsxCreatorComponent', () => {
  let component: XlsxCreatorComponent;
  let fixture: ComponentFixture<XlsxCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ XlsxCreatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(XlsxCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
