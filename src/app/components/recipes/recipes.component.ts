import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Recipe } from '../../models/recipe';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, MatIconModule],
  template: `
    <div class="dashboard-layout">
      <!-- Sidebar -->
      <aside class="sidebar">
        <div class="logo">
          <h2>NutriTrack</h2>
          <span class="logo-subtitle">Your Health Journey</span>
        </div>
        
        <nav class="nav-menu">
          <a routerLink="/user" routerLinkActive="active" class="nav-item">
            <mat-icon>dashboard</mat-icon> Dashboard
          </a>
          <a routerLink="/meal-planner" routerLinkActive="active" class="nav-item">
            <mat-icon>restaurant_menu</mat-icon> Meal Planner
          </a>
          <a routerLink="/recipes" routerLinkActive="active" class="nav-item">
            <mat-icon>menu_book</mat-icon> Recipes
          </a>
          <a routerLink="/exercise" routerLinkActive="active" class="nav-item">
            <mat-icon>fitness_center</mat-icon> Exercise & Yoga
          </a>
          <a routerLink="/blog" routerLinkActive="active" class="nav-item">
            <mat-icon>article</mat-icon> Nutrition Blog
          </a>
          <a routerLink="/calendar" routerLinkActive="active" class="nav-item">
            <mat-icon>calendar_today</mat-icon> Calendar
          </a>
          <a routerLink="/settings" routerLinkActive="active" class="nav-item">
            <mat-icon>settings</mat-icon> Settings
          </a>
        </nav>

        <button routerLink="/login" class="logout-btn">
          <mat-icon>logout</mat-icon> Log Out
        </button>
      </aside>

      <!-- Main Content -->
      <main class="main-content">
        <div class="container">
          <!-- Search and Filter Section -->
          <div class="search-section">
            <div class="flex flex-col md:flex-row gap-4">
              <div class="flex-1">
                <input
                  type="text"
                  [(ngModel)]="searchQuery"
                  (ngModelChange)="searchRecipes()"
                  placeholder="Search recipes..."
                  class="search-input"
                />
              </div>
              <div class="flex gap-4">
                <select
                  [(ngModel)]="selectedCategory"
                  (ngModelChange)="filterRecipes()"
                  class="category-select"
                >
                  <option value="">All Categories</option>
                  <option *ngFor="let cat of categories" [value]="cat">{{cat}}</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Recipe Grid -->
          <div class="recipe-grid">
            <div *ngFor="let recipe of filteredRecipes" 
                class="recipe-card"
                (click)="openRecipeDetails(recipe)">
              <div class="recipe-image-container">
                <img 
                  [src]="getRecipeImageUrl(recipe.recipeId!)" 
                  [alt]="recipe.recipeName"
                  class="recipe-image"
                  (error)="onImageError($event)"
                />
                <span class="category-tag">
                  {{recipe.category}}
                </span>
              </div>
              <div class="recipe-content">
                <h3 class="recipe-title">{{recipe.recipeName}}</h3>
                <p class="recipe-description">{{recipe.description}}</p>
                <div class="recipe-stats">
                  <span class="stat-item">
                    <mat-icon>schedule</mat-icon>
                    {{recipe.cookingTime}} mins
                  </span>
                  <span class="stat-item">
                    <mat-icon>local_fire_department</mat-icon>
                    {{recipe.calories}} cal
                  </span>
                  <span class="stat-item">
                    <mat-icon>people</mat-icon>
                    {{recipe.servings}} servings
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Recipe Details Modal -->
          @if (selectedRecipe) {
            <div class="modal-overlay">
              <div class="modal-content">
                <div class="modal-header">
                  <h2>{{selectedRecipe.recipeName}}</h2>
                  <button class="close-btn" (click)="closeRecipeDetails()">
                    <mat-icon>close</mat-icon>
                  </button>
                </div>
                <div class="modal-body">
                  <img 
                    [src]="getRecipeImageUrl(selectedRecipe.recipeId!)" 
                    [alt]="selectedRecipe.recipeName"
                    class="modal-image"
                  />
                  <div class="recipe-info">
                    <p class="description">{{selectedRecipe.description}}</p>
                    <div class="stats-bar">
                      <div class="stat">
                        <mat-icon>schedule</mat-icon>
                        <span>{{selectedRecipe.cookingTime}} mins</span>
                      </div>
                      <div class="stat">
                        <mat-icon>local_fire_department</mat-icon>
                        <span>{{selectedRecipe.calories}} calories</span>
                      </div>
                      <div class="stat">
                        <mat-icon>people</mat-icon>
                        <span>{{selectedRecipe.servings}} servings</span>
                      </div>
                    </div>
                    
                    <div class="nutrition-info">
                      <h3>Nutrition Information</h3>
                      <div class="nutrition-grid">
                        <div class="nutrition-item">
                          <span class="label">Carbs</span>
                          <span class="value">{{selectedRecipe.carbs}}g</span>
                        </div>
                        <div class="nutrition-item">
                          <span class="label">Protein</span>
                          <span class="value">{{selectedRecipe.protein}}g</span>
                        </div>
                        <div class="nutrition-item">
                          <span class="label">Fats</span>
                          <span class="value">{{selectedRecipe.fats}}g</span>
                        </div>
                      </div>
                    </div>

                    <div class="ingredients-section">
                      <h3>Ingredients</h3>
                      <ul>
                        @for (ingredient of getIngredientsList(); track ingredient) {
                          <li>{{ingredient}}</li>
                        }
                      </ul>
                    </div>

                    <div class="instructions-section">
                      <h3>Instructions</h3>
                      <ol>
                        @for (instruction of getInstructionsList(); track instruction) {
                          <li>{{instruction}}</li>
                        }
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      </main>
    </div>
  `,
  styles: [`
    :host {
      --primary-color: #2ecc71;
      --primary-dark: #27ae60;
      --primary-light: #a8e6cf;
      --secondary-color: #3498db;
      --text-primary: #2c3e50;
      --text-secondary: #7f8c8d;
      --bg-primary: #f8fafc;
      --bg-secondary: #ffffff;
      --shadow-sm: 0 2px 4px rgba(0,0,0,0.05);
      --shadow-md: 0 4px 6px rgba(0,0,0,0.07);
      --shadow-lg: 0 10px 15px rgba(0,0,0,0.1);
      --radius-sm: 8px;
      --radius-md: 12px;
      --radius-lg: 16px;
      --spacing-xs: 0.5rem;
      --spacing-sm: 1rem;
      --spacing-md: 1.5rem;
      --spacing-lg: 2rem;
      
      display: block;
      min-height: 100vh;
      background-color: var(--bg-primary);
    }

    .dashboard-layout {
      display: flex;
      min-height: 100vh;
    }

    /* Sidebar Styles */
    .sidebar {
      width: 220px;
      background: var(--bg-secondary);
      padding: var(--spacing-md);
      display: flex;
      flex-direction: column;
      border-right: 1px solid rgba(0,0,0,0.05);
      position: fixed;
      height: 100vh;
      z-index: 100;
    }

    .logo {
      padding: var(--spacing-md) 0;
      text-align: center;
    }

    .logo h2 {
      color: var(--primary-color);
      font-size: 1.8rem;
      margin: 0;
      font-weight: 700;
    }

    .logo-subtitle {
      color: var(--text-secondary);
      font-size: 0.9rem;
    }

    .nav-menu {
      margin-top: var(--spacing-lg);
      display: flex;
      flex-direction: column;
      gap: var(--spacing-xs);
    }

    .nav-item {
      display: flex;
      align-items: center;
      padding: var(--spacing-sm);
      color: var(--text-primary);
      text-decoration: none;
      border-radius: var(--radius-sm);
      transition: all 0.3s ease;
    }

    .nav-item mat-icon {
      margin-right: var(--spacing-sm);
    }

    .nav-item:hover {
      background: var(--primary-light);
      color: var(--primary-dark);
      transform: translateX(5px);
    }

    .nav-item.active {
      background: var(--primary-color);
      color: white;
    }

    .logout-btn {
      margin-top: auto;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--spacing-sm);
      background: none;
      border: 1px solid #ff6b6b;
      color: #ff6b6b;
      border-radius: var(--radius-sm);
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .logout-btn:hover {
      background: #ff6b6b;
      color: white;
    }

    .logout-btn mat-icon {
      margin-right: var(--spacing-sm);
    }

    /* Main Content Styles */
    .main-content {
      flex: 1;
      margin-left: 270px;
      padding: var(--spacing-lg);
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
    }

    /* Search Section Styles */
    .search-section {
      margin-bottom: var(--spacing-lg);
      background: var(--bg-secondary);
      padding: var(--spacing-md);
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-md);
    }

    .search-input {
      width: 100%;
      padding: var(--spacing-sm);
      border: 1px solid rgba(0,0,0,0.1);
      border-radius: var(--radius-sm);
      font-size: 1rem;
    }

    .category-select {
      padding: var(--spacing-sm);
      border: 1px solid rgba(0,0,0,0.1);
      border-radius: var(--radius-sm);
      min-width: 150px;
    }

    /* Recipe Grid Styles */
    .recipe-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: var(--spacing-md);
    }

    .recipe-card {
      background: var(--bg-secondary);
      border-radius: var(--radius-md);
      overflow: hidden;
      box-shadow: var(--shadow-md);
      transition: transform 0.3s ease;
      cursor: pointer;
    }

    .recipe-card:hover {
      transform: translateY(-5px);
    }

    .recipe-image-container {
      position: relative;
      height: 200px;
    }

    .recipe-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .category-tag {
      position: absolute;
      top: var(--spacing-sm);
      right: var(--spacing-sm);
      background: var(--primary-color);
      color: white;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 0.8rem;
    }

    .recipe-content {
      padding: var(--spacing-md);
    }

    .recipe-title {
      font-size: 1.2rem;
      font-weight: 600;
      margin: 0 0 var(--spacing-xs) 0;
      color: var(--text-primary);
    }

    .recipe-description {
      color: var(--text-secondary);
      font-size: 0.9rem;
      margin-bottom: var(--spacing-sm);
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .recipe-stats {
      display: flex;
      justify-content: space-between;
      color: var(--text-secondary);
      font-size: 0.9rem;
    }

    .stat-item {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .stat-item mat-icon {
      font-size: 1rem;
      width: 16px;
      height: 16px;
    }

    /* Modal Styles */
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
      padding: var(--spacing-md);
    }

    .modal-content {
      background: var(--bg-secondary);
      border-radius: var(--radius-lg);
      width: 100%;
      max-width: 800px;
      max-height: 90vh;
      overflow-y: auto;
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--spacing-md);
      border-bottom: 1px solid rgba(0,0,0,0.1);
    }

    .modal-header h2 {
      margin: 0;
      font-size: 1.5rem;
      color: var(--text-primary);
    }

    .close-btn {
      background: none;
      border: none;
      color: var(--text-secondary);
      cursor: pointer;
      padding: var(--spacing-xs);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.3s ease;
    }

    .close-btn:hover {
      background-color: rgba(0,0,0,0.05);
    }

    .modal-body {
      padding: var(--spacing-md);
    }

    .modal-image {
      width: 100%;
      height: 300px;
      object-fit: cover;
      border-radius: var(--radius-md);
      margin-bottom: var(--spacing-md);
    }

    .recipe-info {
      color: var(--text-primary);
    }

    .description {
      font-size: 1rem;
      line-height: 1.6;
      margin-bottom: var(--spacing-md);
    }

    .stats-bar {
      display: flex;
      justify-content: space-around;
      padding: var(--spacing-md);
      background: var(--bg-primary);
      border-radius: var(--radius-md);
      margin-bottom: var(--spacing-md);
    }

    .stat {
      display: flex;
      align-items: center;
      gap: var(--spacing-xs);
      color: var(--text-secondary);
    }

    .nutrition-info {
      margin-bottom: var(--spacing-lg);
    }

    .nutrition-info h3 {
      margin-bottom: var(--spacing-md);
      color: var(--text-primary);
      font-size: 1.2rem;
    }

    .nutrition-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--spacing-md);
    }

    .nutrition-item {
      background: var(--bg-primary);
      padding: var(--spacing-sm);
      border-radius: var(--radius-sm);
      text-align: center;
    }

    .nutrition-item .label {
      display: block;
      color: var(--text-secondary);
      font-size: 0.9rem;
      margin-bottom: 4px;
    }

    .nutrition-item .value {
      color: var(--text-primary);
      font-weight: 600;
      font-size: 1.1rem;
    }

    .ingredients-section,
    .instructions-section {
      margin-bottom: var(--spacing-lg);
    }

    .ingredients-section h3,
    .instructions-section h3 {
      margin-bottom: var(--spacing-md);
      color: var(--text-primary);
      font-size: 1.2rem;
    }

    .ingredients-section ul {
      list-style: none;
      padding: 0;
    }

    .ingredients-section li {
      padding: var(--spacing-xs) 0;
      border-bottom: 1px solid rgba(0,0,0,0.05);
      color: var(--text-primary);
    }

    .instructions-section ol {
      padding-left: var(--spacing-lg);
    }

    .instructions-section li {
      margin-bottom: var(--spacing-sm);
      color: var(--text-primary);
      line-height: 1.6;
    }

    /* Responsive Design */
    @media (max-width: 1024px) {
      .recipe-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 768px) {
      .sidebar {
        transform: translateX(-100%);
        position: fixed;
        transition: transform 0.3s ease;
      }

      .sidebar.active {
        transform: translateX(0);
      }

      .main-content {
        margin-left: 0;
        padding: var(--spacing-md);
      }

      .recipe-grid {
        grid-template-columns: 1fr;
      }

      .nutrition-grid {
        grid-template-columns: repeat(2, 1fr);
      }

      .modal-content {
        max-height: 100vh;
        border-radius: 0;
      }
    }

    @media (max-width: 480px) {
      .nutrition-grid {
        grid-template-columns: 1fr;
      }

      .stats-bar {
        flex-direction: column;
        gap: var(--spacing-sm);
      }

      .modal-content {
        padding: var(--spacing-sm);
      }

      .search-section .flex {
        flex-direction: column;
      }

      .category-select {
        width: 100%;
      }
    }
  `]
})
export class RecipesComponent implements OnInit {
  recipes: Recipe[] = [];
  filteredRecipes: Recipe[] = [];
  selectedRecipe: Recipe | null = null;
  searchQuery: string = '';
  selectedCategory: string = '';
  categories: string[] = [];

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.loadRecipes();
  }

  loadRecipes(): void {
    this.recipeService.getAllRecipes().subscribe({
      next: (recipes) => {
        this.recipes = recipes;
        this.filteredRecipes = recipes;
        this.extractCategories();
      },
      error: (error) => console.error('Error loading recipes:', error)
    });
  }

  getRecipeImageUrl(recipeId: number): string {
    return this.recipeService.getRecipeImage(recipeId);
  }

  onImageError(event: any): void {
    event.target.src = 'assets/placeholder-recipe.jpg';
  }

  extractCategories(): void {
    this.categories = [...new Set(this.recipes.map(recipe => recipe.category))];
  }

  searchRecipes(): void {
    this.recipeService.getAllRecipes(this.searchQuery).subscribe({
      next: (recipes) => {
        this.recipes = recipes;
        this.filterRecipes();
      },
      error: (error) => console.error('Error searching recipes:', error)
    });
  }

  filterRecipes(): void {
    this.filteredRecipes = this.recipes;
    
    if (this.selectedCategory) {
      this.filteredRecipes = this.filteredRecipes.filter(
        recipe => recipe.category === this.selectedCategory
      );
    }
  }

  openRecipeDetails(recipe: Recipe): void {
    this.recipeService.getRecipeById(recipe.recipeId!).subscribe({
      next: (fullRecipe) => {
        this.selectedRecipe = fullRecipe;
        document.body.style.overflow = 'hidden';
      },
      error: (error) => console.error('Error loading recipe details:', error)
    });
  }

  closeRecipeDetails(): void {
    this.selectedRecipe = null;
    document.body.style.overflow = 'auto';
  }

  getIngredientsList(): string[] {
    return this.selectedRecipe?.ingredients.split('\n').filter(i => i.trim()) ?? [];
  }

  getInstructionsList(): string[] {
    return this.selectedRecipe?.instructions.split('\n').filter(i => i.trim()) ?? [];
  }

  ngOnDestroy(): void {
    document.body.style.overflow = 'auto';
  }
}