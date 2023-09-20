import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewWebsiteComponent } from './add-new-website.component';

describe('AddNewWebsiteComponent', () => {
  let component: AddNewWebsiteComponent;
  let fixture: ComponentFixture<AddNewWebsiteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddNewWebsiteComponent]
    });
    fixture = TestBed.createComponent(AddNewWebsiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
