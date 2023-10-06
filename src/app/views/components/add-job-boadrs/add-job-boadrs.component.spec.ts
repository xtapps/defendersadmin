import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddJobBoadrsComponent } from './add-job-boadrs.component';

describe('AddJobBoadrsComponent', () => {
  let component: AddJobBoadrsComponent;
  let fixture: ComponentFixture<AddJobBoadrsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddJobBoadrsComponent]
    });
    fixture = TestBed.createComponent(AddJobBoadrsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
