import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobOpportunitiesComponent } from './job-opportunities.component';

describe('JobOpportunitiesComponent', () => {
  let component: JobOpportunitiesComponent;
  let fixture: ComponentFixture<JobOpportunitiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobOpportunitiesComponent]
    });
    fixture = TestBed.createComponent(JobOpportunitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
