import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingBComponent } from './landing-b.component';

describe('LandingBComponent', () => {
  let component: LandingBComponent;
  let fixture: ComponentFixture<LandingBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingBComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
