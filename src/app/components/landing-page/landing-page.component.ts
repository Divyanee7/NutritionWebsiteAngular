import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-landing-page',
  standalone: true,  // Add this
  imports: [    // Add this
    CommonModule,
    FormsModule
  ],
  template: `
    <div class="landing-container">
      <h1>Welcome to Nutrition Hub</h1>
      <div class="button-container">
        <button (click)="navigateToLogin()">Login</button>
        <button (click)="navigateToRegister()">Register</button>
      </div>
    </div>
  `,
  styles: [`
    .landing-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      background-color: #f0f2f5;
    }
    .button-container {
      display: flex;
      gap: 20px;
      margin-top: 20px;
    }
    button {
      padding: 10px 20px;
      font-size: 16px;
      border: none;
      border-radius: 5px;
      background-color: #4CAF50;
      color: white;
      cursor: pointer;
    }
    button:hover {
      background-color: #45a049;
    }
  `]
})
export class LandingPageComponent {
  constructor(private router: Router) {}

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}