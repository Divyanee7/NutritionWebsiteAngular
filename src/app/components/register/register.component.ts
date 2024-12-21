import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  template: `
    <div class="register-container">
      <h2>Register</h2>
      <form (ngSubmit)="onSubmit()" #registerForm="ngForm">
        <!-- Personal Information -->
        <div class="form-section">
          <h3>Personal Information</h3>
          <div class="form-group">
            <label for="name">Full Name:</label>
            <input type="text" id="name" [(ngModel)]="user.name" name="name" required>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="age">Age:</label>
              <input type="number" id="age" [(ngModel)]="user.age" name="age" required>
            </div>
            
            <div class="form-group">
              <label for="gender">Gender:</label>
              <select id="gender" [(ngModel)]="user.gender" name="gender" required>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Contact Information -->
        <div class="form-section">
          <h3>Contact Information</h3>
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" [(ngModel)]="user.email" name="email" required>
          </div>
          
          <div class="form-group">
            <label for="phone">Phone:</label>
            <input type="tel" id="phone" [(ngModel)]="user.phone" name="phone" required>
          </div>
        </div>

        <!-- Login Information -->
        <div class="form-section">
          <h3>Login Information</h3>
          <div class="form-group">
            <label for="loginName">Username:</label>
            <input type="text" id="loginName" [(ngModel)]="user.loginName" name="loginName" required>
          </div>
          
          <div class="form-group">
            <label for="password">Password:</label>
            <input type="password" id="password" [(ngModel)]="user.password" name="password" required>
          </div>
        </div>

        <!-- Health Information -->
        <div class="form-section">
          <h3>Health Information</h3>
          <div class="form-row">
            <div class="form-group">
              <label for="height">Height (cm):</label>
              <input type="number" id="height" [(ngModel)]="user.height" name="height" required>
            </div>
            
            <div class="form-group">
              <label for="weight">Weight (kg):</label>
              <input type="number" id="weight" [(ngModel)]="user.weight" name="weight" required>
            </div>
          </div>
          
          <div class="form-group">
            <label for="targetWeight">Target Weight (kg):</label>
            <input type="number" id="targetWeight" [(ngModel)]="user.targetWeight" name="targetWeight" required>
          </div>
        </div>

        <!-- Goals and Preferences -->
        <div class="form-section">
          <h3>Goals and Preferences</h3>
          <div class="form-group">
            <label for="activityLevel">Activity Level:</label>
            <select id="activityLevel" [(ngModel)]="user.activityLevel" name="activityLevel" required>
              <option value="">Select Activity Level</option>
              <option value="sedentary">Sedentary</option>
              <option value="light">Lightly Active</option>
              <option value="moderate">Moderately Active</option>
              <option value="very">Very Active</option>
              <option value="extra">Extra Active</option>
            </select>
          </div>
          
          <div class="form-group">
            <label for="primaryGoal">Primary Goal:</label>
            <select id="primaryGoal" [(ngModel)]="user.primaryGoal" name="primaryGoal" required>
              <option value="">Select Primary Goal</option>
              <option value="weight_loss">Weight Loss</option>
              <option value="muscle_gain">Muscle Gain</option>
              <option value="maintenance">Maintenance</option>
              <option value="general_health">General Health</option>
            </select>
          </div>
          
          <div class="form-group">
            <label for="weeklyGoal">Weekly Goal (kg):</label>
            <input type="number" id="weeklyGoal" [(ngModel)]="user.weeklyGoal" name="weeklyGoal" required>
          </div>
          
          <div class="form-group">
            <label for="dietaryPreferences">Dietary Preferences:</label>
            <select id="dietaryPreferences" [(ngModel)]="user.dietaryPreferences" name="dietaryPreferences" required>
              <option value="">Select Dietary Preference</option>
              <option value="none">No Specific Diet</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="vegan">Vegan</option>
              <option value="keto">Keto</option>
              <option value="paleo">Paleo</option>
            </select>
          </div>
          
          <div class="form-group">
            <label for="foodAllergies">Food Allergies:</label>
            <textarea id="foodAllergies" [(ngModel)]="user.foodAllergies" name="foodAllergies" rows="3"></textarea>
          </div>
        </div>

        <button type="submit" [disabled]="!registerForm.form.valid">Register</button>
      </form>
    </div>
  `,
  styles: [`
    .register-container {
      max-width: 800px;
      margin: 30px auto;
      padding: 20px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
      border-radius: 5px;
    }

    .form-section {
      margin-bottom: 30px;
      padding: 20px;
      background-color: #f9f9f9;
      border-radius: 5px;
    }

    h3 {
      margin-top: 0;
      margin-bottom: 20px;
      color: #333;
      font-size: 1.2em;
    }

    .form-row {
      display: flex;
      gap: 20px;
    }

    .form-group {
      margin-bottom: 15px;
      flex: 1;
    }

    label {
      display: block;
      margin-bottom: 5px;
      font-weight: 500;
    }

    input, select, textarea {
      width: 100%;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
      box-sizing: border-box;
    }

    textarea {
      resize: vertical;
      min-height: 60px;
    }

    button {
      width: 100%;
      padding: 12px;
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
    }

    button:disabled {
      background-color: #cccccc;
      cursor: not-allowed;
    }

    button:hover:not(:disabled) {
      background-color: #45a049;
    }

    .error-message {
      color: #ff0000;
      font-size: 0.9em;
      margin-top: 5px;
    }
  `]
})
export class RegisterComponent {
  user: User = {
    name: '',
    phone: '',
    email: '',
    dietaryPreferences: '',
    loginName: '',
    password: '',
    role: 2, // Default role is user
    loginStatus: 1,
    age: 0,
    gender: '',
    height: 0,
    weight: 0,
    targetWeight: 0,
    activityLevel: '',
    primaryGoal: '',
    weeklyGoal: 0,
    foodAllergies: '',
    enabled: true
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    this.authService.register(this.user).subscribe({
      next: () => {
        alert('Registration successful!');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Registration failed:', error);
        alert('Registration failed. Please try again.');
      }
    });
  }
}