import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  template: `
    <!-- Navigation Bar -->
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

    <!-- Login Section with matching hero gradient -->
    <section class="login-section">
      <div class="login-container">
        <h2><i class="fas fa-sign-in-alt"></i> Login</h2>
        <form (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="username">Username:</label>
            <input 
              type="text" 
              id="username" 
              [(ngModel)]="username" 
              name="username" 
              required
              placeholder="Enter your username"
            >
          </div>
          <div class="form-group">
            <label for="password">Password:</label>
            <input 
              type="password" 
              id="password" 
              [(ngModel)]="password" 
              name="password" 
              required
              placeholder="Enter your password"
            >
          </div>
          <button type="submit" class="btn">
            <i class="fas fa-sign-in-alt"></i> Login
          </button>
        </form>
        <div class="register-link">
          Don't have an account? 
          <a [routerLink]="['/register']">Register here</a>
        </div>
      </div>
    </section>
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

    /* Login Section Styles */
    .login-section {
      min-height: calc(100vh - 74px);
      background: linear-gradient(135deg, #2ecc71 0%, #27ae60 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
    }

    .login-container {
      background: white;
      padding: 2.5rem;
      border-radius: 15px;
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
      width: 100%;
      max-width: 400px;
    }

    .login-container h2 {
      color: #2c3e50;
      margin-bottom: 1.5rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 1.8rem;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    label {
      display: block;
      margin-bottom: 0.5rem;
      color: #2c3e50;
      font-weight: 600;
    }

    input {
      width: 100%;
      padding: 0.8rem;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      transition: border-color 0.3s ease;
      font-size: 1rem;
    }

    input:focus {
      outline: none;
      border-color: #2ecc71;
    }

    .btn {
      width: 100%;
      padding: 12px 25px;
      background-color: #f1c40f;
      color: #2c3e50;
      border: none;
      border-radius: 8px;
      font-weight: bold;
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }

    .btn:hover {
      background-color: #2c3e50;
      color: white;
    }

    .register-link {
      margin-top: 1.5rem;
      text-align: center;
      color: #666;
    }

    .register-link a {
      color: #2ecc71;
      text-decoration: none;
      font-weight: 600;
    }

    .register-link a:hover {
      text-decoration: underline;
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

      .login-container {
        margin: 1rem;
        padding: 1.5rem;
      }
    }
  `]
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  isMenuOpen: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        this.authService.setCurrentUser(response);
        if (response.role === 1) {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/user']);
        }
      },
      error: (error) => {
        console.error('Login failed:', error);
        alert('Login failed. Please try again.');
      }
    });
  }
}