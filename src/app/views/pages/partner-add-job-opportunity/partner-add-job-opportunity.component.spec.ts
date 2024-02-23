import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerAddJobOpportunityComponent } from './partner-add-job-opportunity.component';

describe('PartnerAddJobOpportunityComponent', () => {
  let component: PartnerAddJobOpportunityComponent;
  let fixture: ComponentFixture<PartnerAddJobOpportunityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartnerAddJobOpportunityComponent]
    });
    fixture = TestBed.createComponent(PartnerAddJobOpportunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
