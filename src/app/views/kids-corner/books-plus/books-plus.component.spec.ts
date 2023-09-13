import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksPlusComponent } from './books-plus.component';

describe('BooksPlusComponent', () => {
  let component: BooksPlusComponent;
  let fixture: ComponentFixture<BooksPlusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BooksPlusComponent]
    });
    fixture = TestBed.createComponent(BooksPlusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
