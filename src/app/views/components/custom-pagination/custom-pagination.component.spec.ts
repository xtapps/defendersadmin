import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomPaginationComponent } from './custom-pagination.component';

describe('PaginationComponent', () => {
  let component: CustomPaginationComponent;
  let fixture: ComponentFixture<CustomPaginationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomPaginationComponent]
    });
    fixture = TestBed.createComponent(CustomPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
