import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessingListComponent } from './processing-list.component';

describe('ProcessingListComponent', () => {
  let component: ProcessingListComponent;
  let fixture: ComponentFixture<ProcessingListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProcessingListComponent]
    });
    fixture = TestBed.createComponent(ProcessingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
