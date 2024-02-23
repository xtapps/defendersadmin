import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerPropertyEditFormComponent } from './partner-property-edit-form.component';

describe('PartnerPropertyEditFormComponent', () => {
  let component: PartnerPropertyEditFormComponent;
  let fixture: ComponentFixture<PartnerPropertyEditFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartnerPropertyEditFormComponent]
    });
    fixture = TestBed.createComponent(PartnerPropertyEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
