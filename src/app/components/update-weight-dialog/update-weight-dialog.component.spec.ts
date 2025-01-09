import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateWeightDialogComponent } from './update-weight-dialog.component';

describe('UpdateWeightDialogComponent', () => {
  let component: UpdateWeightDialogComponent;
  let fixture: ComponentFixture<UpdateWeightDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateWeightDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateWeightDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
