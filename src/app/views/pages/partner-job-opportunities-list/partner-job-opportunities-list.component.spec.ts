import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerJobOpportunitiesListComponent } from './partner-job-opportunities-list.component';

describe('PartnerJobOpportunitiesListComponent', () => {
  let component: PartnerJobOpportunitiesListComponent;
  let fixture: ComponentFixture<PartnerJobOpportunitiesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartnerJobOpportunitiesListComponent]
    });
    fixture = TestBed.createComponent(PartnerJobOpportunitiesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
