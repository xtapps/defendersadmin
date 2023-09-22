import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewFranchisesComponent } from './add-new-franchises.component';

describe('AddNewFranchisesComponent', () => {
  let component: AddNewFranchisesComponent;
  let fixture: ComponentFixture<AddNewFranchisesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddNewFranchisesComponent]
    });
    fixture = TestBed.createComponent(AddNewFranchisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
