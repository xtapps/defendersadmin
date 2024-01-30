import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstResponderComponent } from './first-responder.component';

describe('FirstResponderComponent', () => {
  let component: FirstResponderComponent;
  let fixture: ComponentFixture<FirstResponderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FirstResponderComponent]
    });
    fixture = TestBed.createComponent(FirstResponderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
