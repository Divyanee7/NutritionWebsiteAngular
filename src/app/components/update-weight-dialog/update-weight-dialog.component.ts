import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

export interface WeightDialogData {
  currentWeight: number;
}

export interface WeightDialogResult {
  weight: number;
}

@Component({
  selector: 'app-update-weight-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule
  ],
  template: `
    <div class="dialog-container">
      <h2 mat-dialog-title>Update Weight</h2>
      
      <mat-dialog-content>
        <div class="form-content">
          <mat-form-field appearance="fill" class="full-width">
            <mat-label>Weight (kg)</mat-label>
            <input
              matInput
              type="number"
              [(ngModel)]="weight"
              placeholder="Enter your weight"
              min="0"
              step="0.1"
              [disabled]="isLoading"
            >
            <mat-icon matSuffix>monitor_weight</mat-icon>
            @if (error) {
              <mat-error>{{error}}</mat-error>
            }
          </mat-form-field>
        </div>
      </mat-dialog-content>

      <mat-dialog-actions align="end">
        <button mat-button (click)="onCancel()" [disabled]="isLoading">Cancel</button>
        <button 
          mat-raised-button 
          color="primary" 
          (click)="onSubmit()"
          [disabled]="isLoading"
        >
          {{isLoading ? 'Updating...' : 'Update'}}
        </button>
      </mat-dialog-actions>
    </div>
  `,
  styles: [`
    .dialog-container {
      padding: 20px;
      min-width: 300px;
    }

    .form-content {
      margin: 20px 0;
    }

    .full-width {
      width: 100%;
    }

    mat-dialog-actions {
      margin-bottom: 0;
      padding: 8px 0;
    }
  `]
})
export class UpdateWeightDialogComponent {
  weight: number;
  error: string = '';
  isLoading = false;

  constructor(
    public dialogRef: MatDialogRef<UpdateWeightDialogComponent, WeightDialogResult>,
    @Inject(MAT_DIALOG_DATA) public data: WeightDialogData
  ) {
    this.weight = data.currentWeight;
  }

  onSubmit() {
    if (!this.weight || this.weight <= 0) {
      this.error = 'Please enter a valid weight';
      return;
    }

    // Return the weight in the expected format
    this.dialogRef.close({ weight: this.weight });
  }

  onCancel() {
    this.dialogRef.close();
  }
}