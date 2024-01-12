import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThoughtFormComponent } from './thought-form.component';

describe('ThoughtFormComponent', () => {
  let component: ThoughtFormComponent;
  let fixture: ComponentFixture<ThoughtFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThoughtFormComponent]
    });
    fixture = TestBed.createComponent(ThoughtFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
