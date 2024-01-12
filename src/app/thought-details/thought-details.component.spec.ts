import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThoughtDetailsComponent } from './thought-details.component';

describe('ThoughtDetailsComponent', () => {
  let component: ThoughtDetailsComponent;
  let fixture: ComponentFixture<ThoughtDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThoughtDetailsComponent]
    });
    fixture = TestBed.createComponent(ThoughtDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
