import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule  // Added RouterModule to imports
  ],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {
  constructor(private router: Router) {}

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }

  navigateToMealPlanner() {
    this.router.navigate(['/meal-planner']);
  }

  navigateToRecipes() {
    this.router.navigate(['/recipes']);
  }

  navigateToBmi() {
    this.router.navigate(['/bmi']);
  }

  navigateToContact() {
    this.router.navigate(['/contact']);
  }

  navigateToAbout() {
    this.router.navigate(['/about']);
  }

  toggleMenu() {
    const navMenu = document.getElementById('navMenu');
    navMenu?.classList.toggle('show');
  }
}