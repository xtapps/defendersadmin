import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupCodesComponent } from './group-codes.component';

describe('GroupCodesComponent', () => {
  let component: GroupCodesComponent;
  let fixture: ComponentFixture<GroupCodesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GroupCodesComponent]
    });
    fixture = TestBed.createComponent(GroupCodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
