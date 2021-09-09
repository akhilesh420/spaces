import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenefitsTextComponent } from './benefits-text.component';

describe('BenefitsTextComponent', () => {
  let component: BenefitsTextComponent;
  let fixture: ComponentFixture<BenefitsTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BenefitsTextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BenefitsTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
