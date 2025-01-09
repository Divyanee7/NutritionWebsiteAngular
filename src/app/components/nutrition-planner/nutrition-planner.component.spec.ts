import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutritionPlannerComponent } from './nutrition-planner.component';

describe('NutritionPlannerComponent', () => {
  let component: NutritionPlannerComponent;
  let fixture: ComponentFixture<NutritionPlannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NutritionPlannerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NutritionPlannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
