import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurvivalComponent } from './survival.component';

describe('SurvivalComponent', () => {
  let component: SurvivalComponent;
  let fixture: ComponentFixture<SurvivalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SurvivalComponent]
    });
    fixture = TestBed.createComponent(SurvivalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
