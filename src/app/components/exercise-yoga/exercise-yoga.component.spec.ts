import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseYogaComponent } from './exercise-yoga.component';

describe('ExerciseYogaComponent', () => {
  let component: ExerciseYogaComponent;
  let fixture: ComponentFixture<ExerciseYogaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExerciseYogaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExerciseYogaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
