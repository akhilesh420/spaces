import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HowItWorksBComponent } from './how-it-works-b.component';

describe('HowItWorksBComponent', () => {
  let component: HowItWorksBComponent;
  let fixture: ComponentFixture<HowItWorksBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HowItWorksBComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HowItWorksBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
