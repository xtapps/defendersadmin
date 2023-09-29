import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitedListComponent } from './submited-list.component';

describe('SubmitedListComponent', () => {
  let component: SubmitedListComponent;
  let fixture: ComponentFixture<SubmitedListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubmitedListComponent]
    });
    fixture = TestBed.createComponent(SubmitedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
