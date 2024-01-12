import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThoughtsDisplayComponent } from './thoughts-display.component';

describe('ThoughtsDisplayComponent', () => {
  let component: ThoughtsDisplayComponent;
  let fixture: ComponentFixture<ThoughtsDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThoughtsDisplayComponent]
    });
    fixture = TestBed.createComponent(ThoughtsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
