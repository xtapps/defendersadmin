import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobBoardsComponent } from './job-boards.component';

describe('JobBoardsComponent', () => {
  let component: JobBoardsComponent;
  let fixture: ComponentFixture<JobBoardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobBoardsComponent]
    });
    fixture = TestBed.createComponent(JobBoardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
