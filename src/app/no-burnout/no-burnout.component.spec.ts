import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoBurnoutComponent } from './no-burnout.component';

describe('NoBurnoutComponent', () => {
  let component: NoBurnoutComponent;
  let fixture: ComponentFixture<NoBurnoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoBurnoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoBurnoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
