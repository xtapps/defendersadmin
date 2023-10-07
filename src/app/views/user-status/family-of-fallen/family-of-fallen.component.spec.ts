import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyOfFallenComponent } from './family-of-fallen.component';

describe('FamilyOfFallenComponent', () => {
  let component: FamilyOfFallenComponent;
  let fixture: ComponentFixture<FamilyOfFallenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FamilyOfFallenComponent]
    });
    fixture = TestBed.createComponent(FamilyOfFallenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
