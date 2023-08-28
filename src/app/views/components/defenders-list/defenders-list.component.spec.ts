import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefendersListComponent } from './defenders-list.component';

describe('DefendersListComponent', () => {
  let component: DefendersListComponent;
  let fixture: ComponentFixture<DefendersListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DefendersListComponent]
    });
    fixture = TestBed.createComponent(DefendersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
