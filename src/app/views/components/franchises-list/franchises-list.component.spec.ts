import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FranchisesListComponent } from './franchises-list.component';

describe('FranchisesListComponent', () => {
  let component: FranchisesListComponent;
  let fixture: ComponentFixture<FranchisesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FranchisesListComponent]
    });
    fixture = TestBed.createComponent(FranchisesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
