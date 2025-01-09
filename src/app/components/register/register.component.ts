import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    RouterLink,
    RouterModule
  ],
  template: `

   <nav class="navbar">
      <div class="nav-container">
        <a [routerLink]="['/']" class="nav-brand">
          <i class="fas fa-utensils"></i>
          Nutrition Tracker
        </a>
        <button class="mobile-menu-btn" (click)="toggleMenu()">
          <i class="fas fa-bars"></i>
        </button>
        <div class="nav-menu" [class.show]="isMenuOpen" id="navMenu">
          <a [routerLink]="['/meal-planner']" class="nav-link">
            <i class="fas fa-calendar-alt"></i> Nutrition Planner
          </a>
          <a [routerLink]="['/recipes']" class="nav-link">
            <i class="fas fa-book-open"></i> Recipes
          </a>
          <a [routerLink]="['/bmi']" class="nav-link">
            <i class="fas fa-calculator"></i> BMI Calculator
          </a>
          <a [routerLink]="['/contact']" class="nav-link">
            <i class="fas fa-envelope"></i> Contact
          </a>
          <a [routerLink]="['/about']" class="nav-link">
            <i class="fas fa-info-circle"></i> About
          </a>
          <a [routerLink]="['/login']" class="nav-link highlight">
            <i class="fas fa-sign-in-alt"></i> Login
          </a>
        </div>
      </div>
    </nav>


    <div class="main-content">
      <div class="container">
        <div class="header">
          <h1><i class="fas fa-user-plus"></i> Create Your Account</h1>
          <p>Start your nutrition journey today</p>
        </div>

        <mat-stepper linear #stepper class="custom-stepper">
          <!-- Personal Information Step -->
          <mat-step [stepControl]="personalForm" label="Personal Info">
            <form [formGroup]="personalForm">
              <div class="form-section">
                <div class="form-group">
                  <mat-form-field appearance="outline">
                    <mat-label>Full Name</mat-label>
                    <input matInput formControlName="name" required>
                  </mat-form-field>
                </div>

                <div class="form-group">
                  <mat-form-field appearance="outline">
                    <mat-label>Age</mat-label>
                    <input matInput type="number" formControlName="age" required>
                  </mat-form-field>
                </div>

                <div class="form-group">
                  <mat-form-field appearance="outline">
                    <mat-label>Gender</mat-label>
                    <mat-select formControlName="gender" required>
                      <mat-option value="male">Male</mat-option>
                      <mat-option value="female">Female</mat-option>
                      <mat-option value="other">Other</mat-option>
                      <mat-option value="prefer_not">Prefer not to say</mat-option>
                    </mat-select>
                  </mat-form-field>
                </div>
              </div>
              <div class="button-row">
                <button mat-raised-button color="primary" matStepperNext [disabled]="!personalForm.valid">Next</button>
              </div>
            </form>
          </mat-step>

          <!-- Contact Information Step -->
          <mat-step [stepControl]="contactForm" label="Contact Information">
            <form [formGroup]="contactForm">
              <div class="form-section">
                <div class="form-group">
                  <mat-form-field appearance="outline">
                    <mat-label>Email</mat-label>
                    <input matInput type="email" formControlName="email" required>
                  </mat-form-field>
                </div>

                <div class="form-group">
                  <mat-form-field appearance="outline">
                    <mat-label>Phone</mat-label>
                    <input matInput type="tel" formControlName="phone" required>
                  </mat-form-field>
                </div>
              </div>
              <div class="button-row">
                <button mat-button matStepperPrevious>Back</button>
                <button mat-raised-button color="primary" matStepperNext [disabled]="!contactForm.valid">Next</button>
              </div>
            </form>
          </mat-step>

          <!-- Login Information Step -->
          <mat-step [stepControl]="loginForm" label="Login Information">
            <form [formGroup]="loginForm">
              <div class="form-section">
                <div class="form-group">
                  <mat-form-field appearance="outline">
                    <mat-label>Username</mat-label>
                    <input matInput formControlName="loginName" required>
                  </mat-form-field>
                </div>

                <div class="form-group">
                  <mat-form-field appearance="outline">
                    <mat-label>Password</mat-label>
                    <input matInput type="password" formControlName="password" required>
                  </mat-form-field>
                </div>
              </div>
              <div class="button-row">
                <button mat-button matStepperPrevious>Back</button>
                <button mat-raised-button color="primary" matStepperNext [disabled]="!loginForm.valid">Next</button>
              </div>
            </form>
          </mat-step>

          <!-- Health Information Step -->
          <mat-step [stepControl]="healthForm" label="Health Information">
            <form [formGroup]="healthForm">
              <div class="form-section">
                <div class="form-group">
                  <mat-form-field appearance="outline">
                    <mat-label>Height (cm)</mat-label>
                    <input matInput type="number" formControlName="height" required>
                  </mat-form-field>
                </div>

                <div class="form-group">
                  <mat-form-field appearance="outline">
                    <mat-label>Weight (kg)</mat-label>
                    <input matInput type="number" formControlName="weight" required>
                  </mat-form-field>
                </div>

                <div class="form-group">
                  <mat-form-field appearance="outline">
                    <mat-label>Target Weight (kg)</mat-label>
                    <input matInput type="number" formControlName="targetWeight" required>
                  </mat-form-field>
                </div>
              </div>
              <div class="button-row">
                <button mat-button matStepperPrevious>Back</button>
                <button mat-raised-button color="primary" matStepperNext [disabled]="!healthForm.valid">Next</button>
              </div>
            </form>
          </mat-step>

          <!-- Goals and Preferences Step -->
          <mat-step [stepControl]="goalsForm" label="Goals and Preferences">
            <form [formGroup]="goalsForm">
              <div class="form-section">
                <div class="form-group">
                  <mat-form-field appearance="outline">
                    <mat-label>Activity Level</mat-label>
                    <mat-select formControlName="activityLevel" required>
                      <mat-option value="sedentary">Sedentary (little or no exercise)</mat-option>
                      <mat-option value="light">Lightly Active (1-3 days/week)</mat-option>
                      <mat-option value="moderate">Moderately Active (3-5 days/week)</mat-option>
                      <mat-option value="very">Very Active (6-7 days/week)</mat-option>
                      <mat-option value="extra">Extra Active (very hard exercise & physical job)</mat-option>
                    </mat-select>
                  </mat-form-field>
                </div>

                <div class="form-group">
                  <mat-form-field appearance="outline">
                    <mat-label>Primary Goal</mat-label>
                    <mat-select formControlName="primaryGoal" required>
                      <mat-option value="weight_loss">Weight Loss</mat-option>
                      <mat-option value="weight_gain">Weight Gain</mat-option>
                      <mat-option value="maintenance">Maintenance</mat-option>
                      <mat-option value="muscle_gain">Build Muscle</mat-option>
                      <mat-option value="general_health">Improve Overall Health</mat-option>
                    </mat-select>
                  </mat-form-field>
                </div>

                <div class="form-group">
                  <mat-form-field appearance="outline">
                    <mat-label>Weekly Goal (kg)</mat-label>
                    <input matInput type="number" formControlName="weeklyGoal" required>
                  </mat-form-field>
                </div>

                <div class="form-group">
                  <mat-form-field appearance="outline">
                    <mat-label>Dietary Preferences</mat-label>
                    <mat-select formControlName="dietaryPreferences" required>
                      <mat-option value="none">No Specific Diet</mat-option>
                      <mat-option value="vegetarian">Vegetarian</mat-option>
                      <mat-option value="vegan">Vegan</mat-option>
                      <mat-option value="keto">Keto</mat-option>
                      <mat-option value="paleo">Paleo</mat-option>
                    </mat-select>
                  </mat-form-field>
                </div>

                <div class="form-group">
                  <mat-form-field appearance="outline">
                    <mat-label>Food Allergies</mat-label>
                    <textarea matInput formControlName="foodAllergies" rows="3"></textarea>
                  </mat-form-field>
                </div>
              </div>
              <div class="button-row">
                <button mat-button matStepperPrevious>Back</button>
                <button mat-raised-button color="primary" (click)="onSubmit()" 
                        [disabled]="!isFormsValid()" class="submit-button">
                  <i class="fas fa-user-plus"></i> Register Now
                </button>
              </div>
            </form>
          </mat-step>
        </mat-stepper>

        <div class="register-link">
          <p>Already have an account? <a routerLink="/login">Login here</a></p>
        </div>
      </div>
    </div>
  `,
  styles: [`

    .navbar {
      background: #005700;
      padding: 1rem 10%;
      position: sticky;
      top: 0;
      z-index: 1000;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    .nav-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      max-width: 1400px;
      margin: 0 auto;
    }

    .nav-brand {
      display: flex;
      align-items: center;
      gap: 10px;
      color: white;
      text-decoration: none;
      font-size: 1.5rem;
      font-weight: bold;
    }

    .nav-brand i {
      color: #f1c40f;
    }

    .nav-menu {
      display: flex;
      gap: 1.5rem;
      align-items: center;
    }

    .nav-link {
      color: white;
      text-decoration: none;
      padding: 0.5rem 1rem;
      border-radius: 25px;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .nav-link:hover {
      background: rgba(255, 255, 255, 0.1);
      transform: translateY(-2px);
    }

    .nav-link.highlight {
      background: #f1c40f;
      color: #2c3e50;
      font-weight: bold;
    }

    .nav-link.highlight:hover {
      background: #f39c12;
    }

    .mobile-menu-btn {
      display: none;
      background: none;
      border: none;
      color: white;
      font-size: 1.5rem;
      cursor: pointer;
      padding: 0.5rem;
    }

    :host {
      background: linear-gradient(135deg, #2ecc71 0%, #27ae60 100%);
      min-height: 100vh;
      display: block;
    }

    .main-content {
      padding: 2rem;
      display: flex;
      justify-content: center;
    }

    .container {
      background: white;
      border-radius: 15px;
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
      width: 100%;
      max-width: 800px;
      padding: 2rem;
      margin-top: 1rem;
    }

    .header {
      text-align: center;
      margin-bottom: 2rem;
    }

    .header h1 {
      color: #2ecc71;
      font-size: 2rem;
      margin-bottom: 1rem;
    }

    .form-section {
      display: flex;
      flex-direction: column;
      gap: 20px;
      padding: 20px;
    }

    .form-group {
      margin-bottom: 1.5rem;
      position: relative;
    }

    /* Custom styling for Material form fields */
    ::ng-deep .mat-form-field {
      width: 100%;
    }

    ::ng-deep .mat-form-field-outline {
      background: white;
    }

    ::ng-deep .mat-step-header .mat-step-icon-selected {
      background-color: #2ecc71;
    }

    ::ng-deep .mat-step-header .mat-step-icon-state-done {
      background-color: #27ae60;
    }

    ::ng-deep .mat-raised-button.mat-primary {
      background-color: #2ecc71;
    }

    .button-row {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
      padding: 0 20px;
    }

    .submit-button {
      background: #2ecc71;
      color: white;
      padding: 1rem 1.5rem;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      width: auto;
      min-width: 150px;
      font-size: 1.1rem;
      font-weight: 600;
      transition: all 0.3s ease;
    }

    .submit-button:hover:not([disabled]) {
      background: #27ae60;
      transform: translateY(-2px);
      box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1);
    }

    .submit-button[disabled] {
      background: #cccccc;
      cursor: not-allowed;
    }

    .register-link {
      text-align: center;
      margin-top: 1.5rem;
      padding-top: 1rem;
      border-top: 1px solid #ecf0f1;
    }

    .register-link a {
      color: #2ecc71;
      text-decoration: none;
      font-weight: 600;
    }

    .register-link a:hover {
      text-decoration: underline;
    }

    /* Custom stepper styles */
    ::ng-deep .custom-stepper .mat-horizontal-stepper-header {
      pointer-events: none !important;
    }

    ::ng-deep .mat-step-header .mat-step-icon {
      background-color: #2ecc71;
    }

    @media (max-width: 768px) {
      .container {
        margin: 1rem;
        padding: 1.5rem;
      }

      .form-section {
        padding: 10px;
      }

      .button-row {
        flex-direction: column;
        gap: 1rem;
        align-items: stretch;
      }

      .button-row button {
        width: 100%;
      }
    }
  `]
})
export class RegisterComponent {
  isMenuOpen: boolean = false;
  // Component logic remains the same
  personalForm!: FormGroup;
  contactForm!: FormGroup;
  loginForm!: FormGroup;
  healthForm!: FormGroup;
  goalsForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.initializeForms();
  }
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  private initializeForms() {
    this.personalForm = this.fb.group({
      name: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(13), Validators.max(120)]],
      gender: ['', Validators.required]
    });

    this.contactForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('\\d{10}')]]
    });

    this.loginForm = this.fb.group({
      loginName: ['', Validators.required],
      password: ['', [
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,}$')]]
      });
  
      this.healthForm = this.fb.group({
        height: ['', [Validators.required, Validators.min(0)]],
        weight: ['', [Validators.required, Validators.min(0)]],
        targetWeight: ['', [Validators.required, Validators.min(0)]]
      });
  
      this.goalsForm = this.fb.group({
        activityLevel: ['', Validators.required],
        primaryGoal: ['', Validators.required],
        weeklyGoal: ['', [Validators.required, Validators.min(0), Validators.max(2)]],
        dietaryPreferences: ['', Validators.required],
        foodAllergies: ['']
      });
    }
  
    isFormsValid(): boolean {
      return this.personalForm.valid && 
             this.contactForm.valid && 
             this.loginForm.valid && 
             this.healthForm.valid && 
             this.goalsForm.valid;
    }
  
    onSubmit() {
      if (this.isFormsValid()) {
        const user: User = {
          ...this.personalForm.value,
          ...this.contactForm.value,
          ...this.loginForm.value,
          ...this.healthForm.value,
          ...this.goalsForm.value,
          role: 2,
          loginStatus: 1,
          enabled: true
        };
  
        this.authService.register(user).subscribe({
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
  }