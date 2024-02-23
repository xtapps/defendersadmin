import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerViewPageComponent } from './partner-view-page.component';

describe('PartnerViewPageComponent', () => {
  let component: PartnerViewPageComponent;
  let fixture: ComponentFixture<PartnerViewPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartnerViewPageComponent]
    });
    fixture = TestBed.createComponent(PartnerViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
