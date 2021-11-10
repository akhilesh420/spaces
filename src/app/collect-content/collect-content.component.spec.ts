import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectContentComponent } from './collect-content.component';

describe('CollectContentComponent', () => {
  let component: CollectContentComponent;
  let fixture: ComponentFixture<CollectContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
