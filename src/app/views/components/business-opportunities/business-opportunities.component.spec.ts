import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessOpportunitiesComponent } from './business-opportunities.component';

describe('BusinessOpportunitiesComponent', () => {
  let component: BusinessOpportunitiesComponent;
  let fixture: ComponentFixture<BusinessOpportunitiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BusinessOpportunitiesComponent]
    });
    fixture = TestBed.createComponent(BusinessOpportunitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
