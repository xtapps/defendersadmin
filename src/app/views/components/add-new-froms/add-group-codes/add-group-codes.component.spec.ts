import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGroupCodesComponent } from './add-group-codes.component';

describe('AddGroupCodesComponent', () => {
  let component: AddGroupCodesComponent;
  let fixture: ComponentFixture<AddGroupCodesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddGroupCodesComponent]
    });
    fixture = TestBed.createComponent(AddGroupCodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
