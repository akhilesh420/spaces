import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpBannerComponent } from './sign-up-banner.component';

describe('SignUpBannerComponent', () => {
  let component: SignUpBannerComponent;
  let fixture: ComponentFixture<SignUpBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignUpBannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
