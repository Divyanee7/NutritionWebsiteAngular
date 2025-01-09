import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-bmi-calculator',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, RouterLink],
  template: `
    <!-- Navigation Bar -->
    <nav class="navbar">
      <div class="nav-container">
        <a [routerLink]="['/']" class="nav-brand">
          <i class="fas fa-utensils"></i>
          Nutrition Tracker
        </a>
        <button class="mobile-menu-btn" >
          <i class="fas fa-bars"></i>
        </button>
        <div class="nav-menu"  id="navMenu">
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

    <header class="bmi-header">
      <h1>BMI Calculator</h1>
      <p>Understand your body mass index (BMI) and its importance for overall health and wellness. A simple tool to help you track your fitness journey.</p>
    </header>

    <div class="bmi-container">
      <div class="bmi-info">
        <h2>What is BMI?</h2>
        <div class="info-section">
          <p>Body Mass Index (BMI) is a simple measure that uses your height and weight to work out if your weight is healthy. It's a screening tool that can indicate potential health risks associated with weight.</p>
        </div>

        <h2>Why is BMI Important?</h2>
        <div class="info-section">
          <ul>
            <li>Helps assess potential health risks</li>
            <li>Provides a quick overview of body composition</li>
            <li>Can be a starting point for health discussions with professionals</li>
            <li>Useful for tracking personal health and fitness goals</li>
          </ul>
        </div>

        <h2>BMI Categories</h2>
        <div class="info-section">
          <p>
            - Underweight: Below 18.5<br>
            - Normal weight: 18.5 - 24.9<br>
            - Overweight: 25 - 29.9<br>
            - Obesity: 30 or greater
          </p>
        </div>
      </div>

      <div class="bmi-calculator">
        <h2>Calculate Your BMI</h2>
        <form (ngSubmit)="calculateBMI()">
          <div class="form-group">
            <label for="height"><i class="fas fa-ruler-vertical"></i> Height (cm)</label>
            <input 
              id="height"
              type="number"
              [(ngModel)]="height"
              name="height"
              step="0.01"
              placeholder="Enter your height in centimeters"
              required
            >
          </div>

          <div class="form-group">
            <label for="weight"><i class="fas fa-weight"></i> Weight (kg)</label>
            <input 
              id="weight"
              type="number"
              [(ngModel)]="weight"
              name="weight"
              step="0.01"
              placeholder="Enter your weight in kilograms"
              required
            >
          </div>

          <button type="submit" class="calculate-btn">
            <i class="fas fa-calculator"></i> Calculate BMI
          </button>
        </form>

        <div class="result-container" *ngIf="bmiResult">
          <div class="bmi-value">
            Your BMI: <strong>{{bmiResult.toFixed(1)}}</strong>
          </div>
          <div class="bmi-category" [style.backgroundColor]="getCategoryColor()">
            Category: <strong>{{bmiCategory}}</strong>
          </div>

          <div class="recommendation">
            <h3><i class="fas fa-lightbulb"></i> Recommendation</h3>
            <p>{{recommendation}}</p>

            <div class="login-prompt" *ngIf="!isLoggedIn">
              <p>Want personalized nutrition advice and tracking?</p>
              <a (click)="navigateToLogin()" class="login-btn">
                <i class="fas fa-sign-in-alt"></i> Login to Your Account
              </a>
              <p>Don't have an account? <a (click)="navigateToRegister()">Register Now</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    /* Navbar Styles */
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

    /* BMI Calculator Styles */
    .bmi-header {
      background: linear-gradient(135deg, #2ecc71 0%, #27ae60 100%);
      color: white;
      padding: 60px 10%;
      text-align: center;
    }

    .bmi-header h1 {
      font-size: 2.5rem;
      margin-bottom: 20px;
    }

    .bmi-header p {
      font-size: 1.2rem;
      max-width: 800px;
      margin: 0 auto;
      line-height: 1.6;
    }

    .bmi-container {
      max-width: 1200px;
      margin: 50px auto;
      padding: 0 20px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
    }

    .bmi-info {
      background: white;
      padding: 30px;
      border-radius: 15px;
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    }

    .bmi-info h2 {
      color: #2c3e50;
      margin-bottom: 20px;
      font-size: 1.8rem;
    }

    .info-section {
      margin-bottom: 20px;
      background: #f8f9fa;
      padding: 15px;
      border-radius: 10px;
    }

    .bmi-calculator {
      background: white;
      padding: 30px;
      border-radius: 15px;
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    }

    .form-group {
      margin-bottom: 20px;
    }

    .form-group label {
      display: block;
      margin-bottom: 8px;
      color: #2c3e50;
      font-weight: 600;
    }

    .form-group input {
      width: 100%;
      padding: 12px;
      border: 1px solid #ddd;
      border-radius: 8px;
      font-size: 1rem;
      transition: border-color 0.3s ease;
    }

    .form-group input:focus {
      outline: none;
      border-color: #2ecc71;
    }

    .calculate-btn {
      background: #2ecc71;
      color: white;
      padding: 12px 25px;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.3s ease;
      width: 100%;
    }

    .calculate-btn:hover {
      background: #27ae60;
      transform: translateY(-2px);
    }

    .result-container {
      margin-top: 20px;
      background: #f8f9fa;
      padding: 20px;
      border-radius: 10px;
    }

    .bmi-value {
      font-size: 1.5rem;
      color: #2c3e50;
      text-align: center;
      margin-bottom: 15px;
    }

    .bmi-category {
      text-align: center;
      padding: 10px;
      border-radius: 5px;
      margin-bottom: 15px;
    }

    .recommendation {
      background: #e8f5e9;
      padding: 1rem;
      border-radius: 8px;
      margin-top: 1rem;
    }

    .recommendation h3 {
      color: #2c3e50;
      margin-bottom: 10px;
    }

    .login-prompt {
      text-align: center;
      margin-top: 1.5rem;
    }

    .login-prompt a {
      color: #2ecc71;
      text-decoration: none;
      font-weight: 600;
      cursor: pointer;
    }

    .login-btn {
      display: inline-block;
      background: #2ecc71;
      color: white !important;
      padding: 10px 20px;
      border-radius: 5px;
      margin: 10px 0;
      transition: background-color 0.3s;
    }

    .login-btn:hover {
      background: #27ae60;
    }

    /* Responsive Styles */
    @media (max-width: 768px) {
      .mobile-menu-btn {
        display: block;
      }

      .nav-menu {
        display: none;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: #2c3e50;
        flex-direction: column;
        padding: 1rem;
        gap: 0.5rem;
      }

      .nav-menu.show {
        display: flex;
      }

      .nav-link {
        width: 100%;
        padding: 0.8rem 1rem;
        border-radius: 8px;
      }

      .bmi-container {
        grid-template-columns: 1fr;
      }

      .bmi-header {
        padding: 40px 5%;
      }

      .bmi-header h1 {
        font-size: 2rem;
      }

      .bmi-header p {
        font-size: 1.1rem;
      }
    }

    @media (max-width: 480px) {
      .bmi-container {
        padding: 10px;
        margin: 30px auto;
      }

      .bmi-calculator {
        padding: 20px;
      }

      .bmi-value {
        font-size: 1.3rem;
      }
    }
  `]
})
export class BmiCalculatorComponent {
  height: number = 0;
  weight: number = 0;
  bmiResult: number | null = null;
  bmiCategory: string = '';
  recommendation: string = '';
  isLoggedIn: boolean = false;
  
  private router = inject(Router);

  calculateBMI() {
    if (this.height && this.weight) {
      const heightInMeters = this.height / 100;
      this.bmiResult = this.weight / (heightInMeters * heightInMeters);
      this.setBMICategory();
      this.setRecommendation();
    }
  }

  setBMICategory() {
    if (this.bmiResult) {
      if (this.bmiResult < 18.5) {
        this.bmiCategory = 'Underweight';
      } else if (this.bmiResult >= 18.5 && this.bmiResult < 25) {
        this.bmiCategory = 'Normal weight';
      } else if (this.bmiResult >= 25 && this.bmiResult < 30) {
        this.bmiCategory = 'Overweight';
      } else {
        this.bmiCategory = 'Obese';
      }
    }
  }

  setRecommendation() {
    switch (this.bmiCategory) {
      case 'Underweight':
        this.recommendation = 'Consider consulting with a nutritionist to develop a healthy weight gain plan. Focus on nutrient-rich foods and strength training exercises.';
        break;
      case 'Normal weight':
        this.recommendation = 'Great job! Your BMI is within the healthy range. Maintain your healthy lifestyle with balanced nutrition and regular physical activity.';
        break;
      case 'Overweight':
        this.recommendation = 'Consider incorporating more physical activity into your daily routine and focusing on portion control. Our nutrition programs can help you achieve a healthier weight.';
        break;
      case 'Obese':
        this.recommendation = 'It\'s recommended to consult with healthcare professionals to develop a comprehensive weight management plan. Our platform can provide you with structured nutrition and exercise guidance.';
        break;
    }
  }

  getCategoryColor(): string {
    switch (this.bmiCategory) {
      case 'Underweight':
        return '#fff3cd';
      case 'Normal weight':
        return '#d4edda';
      case 'Overweight':
        return '#fff3cd';
      case 'Obese':
        return '#f8d7da';
      default:
        return '#f8f9fa';
    }
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
  
}