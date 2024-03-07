import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewMobileAppComponent } from './add-new-mobile-app.component';

describe('AddNewMobileAppComponent', () => {
  let component: AddNewMobileAppComponent;
  let fixture: ComponentFixture<AddNewMobileAppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddNewMobileAppComponent]
    });
    fixture = TestBed.createComponent(AddNewMobileAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
