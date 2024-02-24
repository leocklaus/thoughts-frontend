import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailsEditPageComponent } from './user-details-edit-page.component';

describe('UserDetailsEditPageComponent', () => {
  let component: UserDetailsEditPageComponent;
  let fixture: ComponentFixture<UserDetailsEditPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserDetailsEditPageComponent]
    });
    fixture = TestBed.createComponent(UserDetailsEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
