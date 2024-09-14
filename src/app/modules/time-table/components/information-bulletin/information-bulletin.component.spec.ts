import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationBulletinComponent } from './information-bulletin.component';

describe('InformationBulletinComponent', () => {
  let component: InformationBulletinComponent;
  let fixture: ComponentFixture<InformationBulletinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformationBulletinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformationBulletinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
