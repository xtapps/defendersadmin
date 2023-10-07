import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewPropertiesComponent } from './add-new-properties.component';

describe('AddNewPropertiesComponent', () => {
  let component: AddNewPropertiesComponent;
  let fixture: ComponentFixture<AddNewPropertiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddNewPropertiesComponent]
    });
    fixture = TestBed.createComponent(AddNewPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
