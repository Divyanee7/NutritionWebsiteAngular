import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { Recipe } from '../../models/recipe';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-admin-recipes',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, RouterModule],
  template: `
    <!-- Fixed Header -->
    <div class="header-container">
      <header class="header">
        <h1>
          <span class="material-icons">restaurant_menu</span>
          Recipe Management
        </h1>
      </header>
      <nav class="navbar">
        <div class="nav-left">
          <a [routerLink]="['/admin/dashboard']" routerLinkActive="active">
            <span class="material-icons">dashboard</span> Dashboard
          </a>
          <a [routerLink]="['/admin']" routerLinkActive="active">
            <span class="material-icons">group</span> Users
          </a>
          <a [routerLink]="['/admin/contact_management']" routerLinkActive="active">
            <span class="material-icons">contact_mail</span> Contact Submissions
          </a>
          <a [routerLink]="['admin/user']" routerLinkActive="active">
            <span class="material-icons">menu_book</span> Recipes Data
          </a>
          <a [routerLink]="['/blog_admin']" routerLinkActive="active">
            <span class="material-icons">article</span> Blog Data
          </a>
          <a [routerLink]="['/admin/foods']" routerLinkActive="active">
            <span class="material-icons">restaurant</span> Food Data
          </a>
        </div>
        <div class="nav-right">
          <a [routerLink]="['/login']" class="btn-danger">
            <span class="material-icons">logout</span> Logout
          </a>
        </div>
      </nav>
    </div>

    <main class="main-content">
      <div class="recipes-container">
        <!-- Action Bar -->
        <div class="table-header">
          <button class="btn btn-primary" (click)="openRecipeForm()">
            <span class="material-icons">add</span> Add New Recipe
          </button>
          
          <div class="search-container">
            <div class="search-form">
              <input 
                type="text" 
                [(ngModel)]="searchQuery" 
                (input)="searchRecipes()"
                placeholder="Search recipes..." 
                class="search-input"
              />
              <select
                [(ngModel)]="selectedCategory"
                (change)="filterRecipes()"
                class="category-select"
              >
                <option value="">All Categories</option>
                <option *ngFor="let cat of categories" [value]="cat">{{cat}}</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Recipes Table -->
        <div class="table-container">
          <table class="recipes-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Cooking Time</th>
                <th>Calories</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let recipe of filteredRecipes">
                <td class="image-cell">
                  <img 
                    [src]="getRecipeImageUrl(recipe.recipeId!)" 
                    [alt]="recipe.recipeName"
                    class="recipe-thumbnail"
                    (error)="onImageError($event)"
                  />
                 
                </td>
                <td>{{recipe.recipeName}}</td>
                <td>{{recipe.category}}</td>
                <td>{{recipe.cookingTime}} mins</td>
                <td>{{recipe.calories}} cal</td>
                <td class="action-buttons">
                  <button class="btn btn-primary" (click)="openRecipeForm(recipe)">
                    <span class="material-icons">edit</span> Edit
                  </button>
                  <button class="btn btn-danger" (click)="confirmDelete(recipe)">
                    <span class="material-icons">delete</span> Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Recipe Form Modal -->
        @if (showRecipeForm) {
          <div class="modal-overlay">
            <div class="modal-content">
              <div class="modal-header">
                <h2>{{editingRecipe ? 'Edit Recipe' : 'Add New Recipe'}}</h2>
                <button class="close-btn" (click)="closeRecipeForm()">
                  <span class="material-icons">close</span>
                </button>
              </div>
              <div class="modal-body">
                <form (submit)="saveRecipe()">
                  <div class="form-group">
                    <label>Recipe Name</label>
                    <input 
                      type="text" 
                      [(ngModel)]="recipeForm.recipeName" 
                      name="recipeName" 
                      required
                    />
                  </div>

                  <div class="form-group">
                    <label>Category</label>
                    <input 
                      type="text" 
                      [(ngModel)]="recipeForm.category" 
                      name="category" 
                      required
                    />
                  </div>

                  <div class="form-group">
                    <label>Description</label>
                    <textarea 
                      [(ngModel)]="recipeForm.description" 
                      name="description" 
                      required
                    ></textarea>
                  </div>

                  <div class="form-row">
                    <div class="form-group">
                      <label>Cooking Time (mins)</label>
                      <input 
                        type="number" 
                        [(ngModel)]="recipeForm.cookingTime" 
                        name="cookingTime" 
                        required
                      />
                    </div>

                    <div class="form-group">
                      <label>Calories</label>
                      <input 
                        type="number" 
                        [(ngModel)]="recipeForm.calories" 
                        name="calories" 
                        required
                      />
                    </div>

                    <div class="form-group">
                      <label>Servings</label>
                      <input 
                        type="number" 
                        [(ngModel)]="recipeForm.servings" 
                        name="servings" 
                        required
                      />
                    </div>
                  </div>

                  <div class="form-row">
                    <div class="form-group">
                      <label>Carbs (g)</label>
                      <input 
                        type="number" 
                        [(ngModel)]="recipeForm.carbs" 
                        name="carbs" 
                        required
                      />
                    </div>

                    <div class="form-group">
                      <label>Protein (g)</label>
                      <input 
                        type="number" 
                        [(ngModel)]="recipeForm.protein" 
                        name="protein" 
                        required
                      />
                    </div>

                    <div class="form-group">
                      <label>Fats (g)</label>
                      <input 
                        type="number" 
                        [(ngModel)]="recipeForm.fats" 
                        name="fats" 
                        required
                      />
                    </div>
                  </div>

                  <div class="form-group">
                    <label>Ingredients</label>
                    <textarea 
                      [(ngModel)]="recipeForm.ingredients" 
                      name="ingredients" 
                      required
                      placeholder="Enter each ingredient on a new line"
                    ></textarea>
                  </div>

                  <div class="form-group">
                    <label>Instructions</label>
                    <textarea 
                      [(ngModel)]="recipeForm.instructions" 
                      name="instructions" 
                      required
                      placeholder="Enter each step on a new line"
                    ></textarea>
                  </div>

                  <div class="form-group">
                    <label>Recipe Image</label>
                    <div class="image-upload-container">
                      <img
                        *ngIf="recipeForm.imageUrl || previewImage"
                        [src]="previewImage || recipeForm.imageUrl"
                        alt="Recipe preview"
                        class="image-preview"
                      />
                      <input
                        type="file"
                        (change)="onImageSelect($event)"
                        accept="image/*"
                        class="file-input"
                        #fileInput
                      />
                      <button 
                        type="button" 
                        class="upload-btn"
                        (click)="fileInput.click()"
                      >
                        <span class="material-icons">upload</span>
                        Select Image
                      </button>
                    </div>
                  </div>

                  <div class="form-actions">
                    <button type="button" class="btn btn-secondary" (click)="closeRecipeForm()">
                      Cancel
                    </button>
                    <button type="submit" class="btn btn-primary">
                      {{editingRecipe ? 'Update Recipe' : 'Create Recipe'}}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        }

        <!-- Delete Confirmation Modal -->
        @if (showDeleteConfirm) {
          <div class="modal-overlay">
            <div class="modal-content confirm-modal">
              <div class="modal-header">
                <h2>Confirm Delete</h2>
                <button class="close-btn" (click)="cancelDelete()">
                  <span class="material-icons">close</span>
                </button>
              </div>
              <div class="modal-body">
                <p>Are you sure you want to delete "{{recipeToDelete?.recipeName}}"?</p>
                <p class="warning">This action cannot be undone.</p>
                <div class="form-actions">
                  <button class="btn btn-secondary" (click)="cancelDelete()">Cancel</button>
                  <button class="btn btn-danger" (click)="deleteRecipe()">Delete</button>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </main>
  `,
  styles: [`
    /* Header Styles */
    .header-container {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      background: #005700;
    }

    .header {
      background: #005700;
      padding: 1rem;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .header h1 {
      color: white;
      text-align: center;
      font-size: 2.5em;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0;
      gap: 10px;
    }

    .header h1 .material-icons {
      font-size: 32px;
      height: 32px;
      width: 32px;
      color: #f1c40f;
    }

    .navbar {
      background: #005700;
      padding: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .nav-left, .nav-right {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .navbar a {
      color: white;
      text-decoration: none;
      padding: 0.7rem 1.2rem;
      border-radius: 25px;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-weight: 500;
      background: rgba(255, 255, 255, 0.1);
      white-space: nowrap;
    }

    .navbar a:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: translateY(-2px);
    }

    .navbar a.active {
      background: #f1c40f;
      color: #2c3e50;
    }

    .btn-danger {
      background: #e74c3c !important;
    }

    /* Main Content Styles */
    .main-content {
      padding: 2rem;
      max-width: 1400px;
      margin: 0 auto;
      width: 100%;
      background: #f5f6fa;
      min-height: 100vh;
      margin-top: 140px;
    }

    .recipes-container {
      background: white;
      border-radius: 15px;
      padding: 2rem;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }

    /* Table Styles */
    .table-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .search-container {
      flex-grow: 1;
      max-width: 600px;
    }

    .search-form {
      display: flex;
      gap: 1rem;
      align-items: center;
    }

    .search-input {
      padding: 0.8rem;
      border: 2px solid #ecf0f1;
      border-radius: 8px;
      font-size: 1rem;
      flex-grow: 1;
      min-width: 200px;
    }

    .category-select {
      padding: 0.8rem;
      border: 2px solid #ecf0f1;
      border-radius: 8px;
      min-width: 200px;
    }

    .table-container {
      overflow-x: auto;
    }

    .recipes-table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 0;
    }

    .recipes-table th,
    .recipes-table td {
      padding: 1rem;
      text-align: left;
      border-bottom: 1px solid #ecf0f1;
    }

   .recipes-table th {
      background: #f8f9fa;
      font-weight: 600;
      color: #2c3e50;
      position: sticky;
      top: 0;
    }

    .image-cell {
      width: 80px;
      padding: 0.5rem;
    }

    .recipe-thumbnail {
      width: 60px;
      height: 60px;
      object-fit: cover;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .action-buttons {
      display: flex;
      gap: 0.5rem;
      flex-wrap: nowrap;
    }

    /* Button Styles */
    .btn {
      padding: 0.8rem 1.5rem;
      border-radius: 8px;
      border: none;
      cursor: pointer;
      font-weight: 500;
      transition: all 0.3s ease;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
    }

    .btn-primary {
      background: #2ecc71;
      color: white;
    }

    .btn-primary:hover {
      background: #27ae60;
      transform: translateY(-2px);
    }

    .btn-secondary {
      background: #95a5a6;
      color: white;
    }

    .btn-secondary:hover {
      background: #7f8c8d;
      transform: translateY(-2px);
    }

    .btn-danger {
      background: #e74c3c;
      color: white;
    }

    .btn-danger:hover {
      background: #c0392b;
      transform: translateY(-2px);
    }

    /* Modal Styles */
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 2rem;
      z-index: 1100;
    }

    .modal-content {
      background: white;
      border-radius: 15px;
      width: 100%;
      max-width: 800px;
      max-height: 90vh;
      overflow-y: auto;
    }

    .confirm-modal {
      max-width: 400px;
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.5rem;
      border-bottom: 1px solid #ecf0f1;
    }

    .modal-header h2 {
      margin: 0;
      font-size: 1.5rem;
      color: #2c3e50;
    }

    .close-btn {
      background: none;
      border: none;
      cursor: pointer;
      color: #95a5a6;
      transition: color 0.3s;
    }

    .close-btn:hover {
      color: #7f8c8d;
    }

    .modal-body {
      padding: 1.5rem;
    }

    /* Form Styles */
    .form-group {
      margin-bottom: 1.5rem;
    }

    .form-row {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
      margin-bottom: 1.5rem;
    }

    label {
      display: block;
      margin-bottom: 0.5rem;
      color: #2c3e50;
      font-weight: 500;
    }

    input,
    select,
    textarea {
      width: 100%;
      padding: 0.75rem;
      border: 2px solid #ecf0f1;
      border-radius: 8px;
      font-size: 1rem;
      transition: border-color 0.3s;
    }

    input:focus,
    select:focus,
    textarea:focus {
      outline: none;
      border-color: #2ecc71;
    }

    textarea {
      min-height: 100px;
      resize: vertical;
    }

    /* Image Upload Styles */
    .image-upload-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      padding: 1.5rem;
      border: 2px dashed #ecf0f1;
      border-radius: 8px;
      transition: border-color 0.3s;
    }

    .image-upload-container:hover {
      border-color: #2ecc71;
    }

    .image-preview {
      max-width: 200px;
      max-height: 200px;
      object-fit: cover;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .file-input {
      display: none;
    }

    .upload-btn {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.5rem;
      background: #2ecc71;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s;
    }

    .upload-btn:hover {
      background: #27ae60;
      transform: translateY(-2px);
    }

    .warning {
      color: #e74c3c;
      margin: 1rem 0;
      font-weight: 500;
    }

    /* Responsive Design */
    @media (max-width: 1024px) {
      .form-row {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 768px) {
      .main-content {
        padding: 1rem;
        margin-top: 180px;
      }

      .header h1 {
        font-size: 2rem;
      }

      .navbar {
        padding: 0.5rem;
      }

      .nav-left, .nav-right {
        width: 100%;
        justify-content: center;
        margin: 0.5rem 0;
      }

      .table-header {
        flex-direction: column;
      }

      .search-form {
        flex-direction: column;
        width: 100%;
      }

      .form-row {
        grid-template-columns: 1fr;
      }

      .action-buttons {
        flex-direction: column;
      }

      .modal-overlay {
        padding: 1rem;
      }

      .modal-content {
        max-height: 85vh;
      }
    }

    @media (max-width: 480px) {
      .navbar a {
        padding: 0.5rem;
        font-size: 0.9rem;
      }

      .header h1 {
        font-size: 1.5rem;
      }

      .recipes-table {
        font-size: 0.9rem;
      }
    }
  `]
})

export class AdminRecipesComponent implements OnInit {
  recipes: Recipe[] = [];
  filteredRecipes: Recipe[] = [];
  categories: string[] = [];
  searchQuery: string = '';
  selectedCategory: string = '';
  previewImage: string | null = null;
  
  // Modal control
  showRecipeForm: boolean = false;
  showDeleteConfirm: boolean = false;
  
  // Form handling
  editingRecipe: boolean = false;
  recipeToDelete: Recipe | null = null;
  recipeForm: Recipe = this.getEmptyRecipeForm();

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.loadRecipes();
  }
  onImageSelect(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.recipeForm.imageFile = file;
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        this.previewImage = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  getEmptyRecipeForm(): Recipe {
    return {
      recipeName: '',
      category: '',
      description: '',
      cookingTime: 0,
      calories: 0,
      servings: 0,
      carbs: 0,
      protein: 0,
      fats: 0,
      ingredients: '',
      instructions: '',
      imageUrl: '',
      imageFile: undefined
    };
  }

  loadRecipes(): void {
    this.recipeService.getAllRecipes().subscribe({
      next: (recipes) => {
        this.recipes = recipes;
        this.filteredRecipes = recipes;
        this.extractCategories();
      },
      error: (error) => {
        console.error('Error loading recipes:', error);
        // Here you might want to add a toast notification for error
      }
    });
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

  getRecipeImageUrl(recipeId: number): string {
    return this.recipeService.getRecipeImage(recipeId);
  }

  onImageError(event: any): void {
    event.target.src = 'assets/placeholder-recipe.jpg';
  }

  // Form Handling
  openRecipeForm(recipe?: Recipe): void {
    if (recipe) {
      this.editingRecipe = true;
      this.recipeForm = { ...recipe };
    } else {
      this.editingRecipe = false;
      this.recipeForm = this.getEmptyRecipeForm();
    }
    this.showRecipeForm = true;
    document.body.style.overflow = 'hidden';
  }

  closeRecipeForm(): void {
    this.showRecipeForm = false;
    this.recipeForm = this.getEmptyRecipeForm();
    this.previewImage = null;
    document.body.style.overflow = 'auto';
  }

  saveRecipe(): void {
    if (this.editingRecipe) {
      this.recipeService.updateRecipe(this.recipeForm).subscribe({
        next: (updatedRecipe) => {
          const index = this.recipes.findIndex(r => r.recipeId === updatedRecipe.recipeId);
          if (index !== -1) {
            this.recipes[index] = updatedRecipe;
            this.filterRecipes();
          }
          this.closeRecipeForm();
          // Add success notification here
        },
        error: (error) => {
          console.error('Error updating recipe:', error);
          // Add error notification here
        }
      });
    } else {
      this.recipeService.createRecipe(this.recipeForm).subscribe({
        next: (newRecipe) => {
          this.recipes.push(newRecipe);
          this.filterRecipes();
          this.closeRecipeForm();
          // Add success notification here
        },
        error: (error) => {
          console.error('Error creating recipe:', error);
          // Add error notification here
        }
      });
    }
  }

  // Delete Handling
  confirmDelete(recipe: Recipe): void {
    this.recipeToDelete = recipe;
    this.showDeleteConfirm = true;
    document.body.style.overflow = 'hidden';
  }

  cancelDelete(): void {
    this.recipeToDelete = null;
    this.showDeleteConfirm = false;
    document.body.style.overflow = 'auto';
  }

  deleteRecipe(): void {
    if (!this.recipeToDelete?.recipeId) return;

    this.recipeService.deleteRecipe(this.recipeToDelete.recipeId).subscribe({
      next: () => {
        this.recipes = this.recipes.filter(r => r.recipeId !== this.recipeToDelete?.recipeId);
        this.filterRecipes();
        this.cancelDelete();
        // Add success notification here
      },
      error: (error) => {
        console.error('Error deleting recipe:', error);
        // Add error notification here
      }
    });
  }

  ngOnDestroy(): void {
    document.body.style.overflow = 'auto';
  }
}