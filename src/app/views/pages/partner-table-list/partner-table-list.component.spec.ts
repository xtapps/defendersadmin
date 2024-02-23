import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerTableListComponent } from './partner-table-list.component';

describe('PartnerTableListComponent', () => {
  let component: PartnerTableListComponent;
  let fixture: ComponentFixture<PartnerTableListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartnerTableListComponent]
    });
    fixture = TestBed.createComponent(PartnerTableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
