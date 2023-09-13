import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewPartnerComponent } from './add-new-partner.component';

describe('AddNewPartnerComponent', () => {
  let component: AddNewPartnerComponent;
  let fixture: ComponentFixture<AddNewPartnerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddNewPartnerComponent]
    });
    fixture = TestBed.createComponent(AddNewPartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
