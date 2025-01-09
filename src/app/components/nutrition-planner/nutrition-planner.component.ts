import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-nutrition-planner',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, RouterLink],
  template: `
    <!-- Navigation Bar (Same as contact component) -->
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

    <!-- Header Section -->
    <header class="planner-header">
      <h1>Nutrition Planner</h1>
      <p>Plan your meals, track your calories, and achieve your nutrition goals</p>
    </header>

    <!-- Main Content -->
    <div class="planner-container">
      <!-- Daily Overview Section -->
      <div class="overview-section">
        <h2>Daily Overview</h2>
        <div class="nutrition-stats">
          <div class="stat-card">
            <i class="fas fa-fire"></i>
            <h3>Calories</h3>
            <p class="current">1,200 / 2,000</p>
            <div class="progress-bar">
              <div class="progress" style="width: 60%"></div>
            </div>
          </div>
          <div class="stat-card">
            <i class="fas fa-drumstick-bite"></i>
            <h3>Protein</h3>
            <p class="current">45g / 80g</p>
            <div class="progress-bar">
              <div class="progress" style="width: 56%"></div>
            </div>
          </div>
          <div class="stat-card">
            <i class="fas fa-bread-slice"></i>
            <h3>Carbs</h3>
            <p class="current">120g / 250g</p>
            <div class="progress-bar">
              <div class="progress" style="width: 48%"></div>
            </div>
          </div>
          <div class="stat-card">
            <i class="fas fa-cheese"></i>
            <h3>Fats</h3>
            <p class="current">35g / 65g</p>
            <div class="progress-bar">
              <div class="progress" style="width: 54%"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Meal Planning Section -->
      <div class="meal-planning-section">
        <h2>Today's Meals</h2>
        <div class="meal-cards">
          <!-- Breakfast -->
          <div class="meal-card">
            <div class="meal-header">
              <h3><i class="fas fa-sun"></i> Breakfast</h3>
              <button class="add-meal-btn">
                <i class="fas fa-plus"></i> Add Food
              </button>
            </div>
            <div class="meal-items">
              <div class="meal-item">
                <span>Oatmeal with Berries</span>
                <span>320 cal</span>
              </div>
              <div class="meal-item">
                <span>Greek Yogurt</span>
                <span>150 cal</span>
              </div>
              <div class="meal-item">
                <span>Banana</span>
                <span>105 cal</span>
              </div>
            </div>
            <div class="meal-total">
              Total: 575 calories
            </div>
          </div>

          <!-- Lunch -->
          <div class="meal-card">
            <div class="meal-header">
              <h3><i class="fas fa-cloud-sun"></i> Lunch</h3>
              <button class="add-meal-btn">
                <i class="fas fa-plus"></i> Add Food
              </button>
            </div>
            <div class="meal-items">
              <div class="meal-item">
                <span>Grilled Chicken Salad</span>
                <span>350 cal</span>
              </div>
              <div class="meal-item">
                <span>Whole Grain Bread</span>
                <span>120 cal</span>
              </div>
              <div class="meal-item">
                <span>Apple</span>
                <span>95 cal</span>
              </div>
            </div>
            <div class="meal-total">
              Total: 565 calories
            </div>
          </div>

          <!-- Dinner -->
          <div class="meal-card">
            <div class="meal-header">
              <h3><i class="fas fa-moon"></i> Dinner</h3>
              <button class="add-meal-btn">
                <i class="fas fa-plus"></i> Add Food
              </button>
            </div>
            <div class="meal-items empty">
              <p>No items added yet</p>
            </div>
            <div class="meal-total">
              Total: 0 calories
            </div>
          </div>

          <!-- Snacks -->
          <div class="meal-card">
            <div class="meal-header">
              <h3><i class="fas fa-cookie"></i> Snacks</h3>
              <button class="add-meal-btn">
                <i class="fas fa-plus"></i> Add Food
              </button>
            </div>
            <div class="meal-items">
              <div class="meal-item">
                <span>Mixed Nuts</span>
                <span>160 cal</span>
              </div>
            </div>
            <div class="meal-total">
              Total: 160 calories
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="quick-actions">
        <button class="action-btn">
          <i class="fas fa-history"></i>
          View History
        </button>
        <button class="action-btn">
          <i class="fas fa-file-export"></i>
          Export Data
        </button>
        <button class="action-btn">
          <i class="fas fa-cog"></i>
          Settings
        </button>
      </div>
    </div>
  `,
  styles: [`
    /* Navbar Styles (Same as contact component) */
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

    /* Planner Styles */
    .planner-header {
      background: linear-gradient(135deg, #2ecc71 0%, #27ae60 100%);
      color: white;
      padding: 60px 10%;
      text-align: center;
    }

    .planner-header h1 {
      font-size: 2.5rem;
      margin-bottom: 20px;
    }

    .planner-header p {
      font-size: 1.2rem;
      max-width: 800px;
      margin: 0 auto;
    }

    .planner-container {
      max-width: 1200px;
      margin: 40px auto;
      padding: 0 20px;
    }

    /* Overview Section */
    .overview-section {
      background: white;
      border-radius: 15px;
      padding: 30px;
      margin-bottom: 40px;
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    }

    .nutrition-stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      margin-top: 20px;
    }

    .stat-card {
      background: #f8f9fa;
      padding: 20px;
      border-radius: 10px;
      text-align: center;
    }

    .stat-card i {
      font-size: 2rem;
      color: #2ecc71;
      margin-bottom: 10px;
    }

    .stat-card h3 {
      margin: 10px 0;
      color: #2c3e50;
    }

    .progress-bar {
      background: #e9ecef;
      height: 8px;
      border-radius: 4px;
      margin-top: 10px;
    }

    .progress {
      background: #2ecc71;
      height: 100%;
      border-radius: 4px;
      transition: width 0.3s ease;
    }

    /* Meal Planning Section */
    .meal-planning-section {
      margin-bottom: 40px;
    }

    .meal-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
      margin-top: 20px;
    }

    .meal-card {
      background: white;
      border-radius: 15px;
      padding: 20px;
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    }

    .meal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
    }

    .meal-header h3 {
      display: flex;
      align-items: center;
      gap: 10px;
      color: #2c3e50;
    }

    .add-meal-btn {
      background: #2ecc71;
      color: white;
      border: none;
      padding: 8px 15px;
      border-radius: 5px;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .add-meal-btn:hover {
      background: #27ae60;
      transform: translateY(-2px);
    }

    .meal-items {
      min-height: 100px;
    }

    .meal-item {
      display: flex;
      justify-content: space-between;
      padding: 10px;
      border-bottom: 1px solid #eee;
    }

    .meal-total {
      margin-top: 15px;
      padding-top: 15px;
      border-top: 2px solid #eee;
      font-weight: bold;
      text-align: right;
      color: #2c3e50;
    }

    .empty {
      display: flex;
      align-items: center;
      justify-content: center;
      color: #6c757d;
      font-style: italic;
    }

    /* Quick Actions */
    .quick-actions {
      display: flex;
      gap: 15px;
      justify-content: center;
    }

    .action-btn {
      background: #2c3e50;
      color: white;
      border: none;
      padding: 12px 25px;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .action-btn:hover {
      background: #34495e;
      transform: translateY(-2px);
    }

    /* Mobile Menu Button */
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

      .quick-actions {
        flex-direction: column;
      }

      .action-btn {
        width: 100%;justify-content: center;
      }

      .planner-header {
        padding: 40px 5%;
      }

      .planner-header h1 {
        font-size: 2rem;
      }

      .planner-header p {
        font-size: 1.1rem;
      }
    }

    @media (max-width: 480px) {
      .planner-container {
        padding: 10px;
        margin: 20px auto;
      }

      .nutrition-stats {
        grid-template-columns: 1fr;
      }

      .meal-cards {
        grid-template-columns: 1fr;
      }

      .stat-card {
        padding: 15px;
      }
    }
  `]
})
export class NutritionPlannerComponent {
  isMenuOpen = false;
  
  // Mock data for demonstration
  nutritionGoals = {
    calories: 2000,
    protein: 80,
    carbs: 250,
    fats: 65
  };

  currentNutrition = {
    calories: 1200,
    protein: 45,
    carbs: 120,
    fats: 35
  };

  meals = {
    breakfast: [
      { name: 'Oatmeal with Berries', calories: 320 },
      { name: 'Greek Yogurt', calories: 150 },
      { name: 'Banana', calories: 105 }
    ],
    lunch: [
      { name: 'Grilled Chicken Salad', calories: 350 },
      { name: 'Whole Grain Bread', calories: 120 },
      { name: 'Apple', calories: 95 }
    ],
    dinner: [],
    snacks: [
      { name: 'Mixed Nuts', calories: 160 }
    ]
  };

  constructor() {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // Calculate total calories for a meal
  getMealTotal(mealType: keyof typeof this.meals): number {
    return this.meals[mealType].reduce((total, item) => total + item.calories, 0);
  }

  // Add a new food item to a meal
  addFoodItem(mealType: keyof typeof this.meals) {
    // This would typically open a modal or form to add new food
    console.log(`Adding food to ${mealType}`);
  }

  // Calculate percentage for progress bars
  getProgressPercentage(current: number, goal: number): number {
    return Math.min((current / goal) * 100, 100);
  }

  // Export nutrition data
  exportData() {
    // Implementation for exporting data
    console.log('Exporting nutrition data...');
  }

  // View nutrition history
  viewHistory() {
    // Implementation for viewing history
    console.log('Viewing nutrition history...');
  }

  // Open settings
  openSettings() {
    // Implementation for settings
    console.log('Opening settings...');
  }
}