import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileAppsComponent } from './mobileapps.component';

describe('MobileAppsComponent', () => {
  let component: MobileAppsComponent;
  let fixture: ComponentFixture<MobileAppsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MobileAppsComponent]
    });
    fixture = TestBed.createComponent(MobileAppsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
