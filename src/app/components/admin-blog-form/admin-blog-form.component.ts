import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { BlogArticle } from '../../models/blog-article';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-admin-blog-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, MatIconModule],
  template: `
    <div class="header-container">
      <header class="header">
        <h1>
          <span class="material-icons">article</span>
          {{isEditMode ? 'Edit Article' : 'Create New Article'}}
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
          <a [routerLink]="['/contact_admin']" routerLinkActive="active">
            <span class="material-icons">contact_mail</span> Contact Submissions
          </a>
          <a routerLink="/recipes_admin" routerLinkActive="active">
            <span class="material-icons">menu_book</span> Recipes
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
      <div class="form-container">
        <form [formGroup]="blogForm" (ngSubmit)="onSubmit()" class="blog-form">
          <div class="form-group">
            <label>Title</label>
            <input 
              type="text" 
              formControlName="title"
              class="form-control"
            >
          </div>

          <div class="form-group">
            <label>Category</label>
            <input 
              type="text" 
              formControlName="category"
              class="form-control"
            >
          </div>

          <div class="form-group">
            <label>Content</label>
            <textarea 
              formControlName="content"
              rows="6"
              class="form-control"
            ></textarea>
          </div>

          <div class="form-group">
            <label>Tags</label>
            <input 
              type="text" 
              formControlName="tags"
              class="form-control"
              placeholder="Separate tags with commas"
            >
          </div>

          <div class="form-group">
            <label>Read Time (minutes)</label>
            <input 
              type="number" 
              formControlName="readTime"
              class="form-control"
            >
          </div>

          <div class="form-group checkbox-group">
            <label class="checkbox-container">
              <input 
                type="checkbox" 
                formControlName="featured"
              >
              <span class="checkbox-label">Featured Article</span>
            </label>
          </div>

          <div class="form-group">
            <label>Image</label>
            <div class="image-upload-container">
              @if (imagePreview) {
                <img 
                  [src]="imagePreview" 
                  class="image-preview"
                >
              }
              <input 
                type="file" 
                (change)="onFileSelected($event)"
                accept="image/*"
                class="file-input"
              >
            </div>
          </div>

          <div class="form-actions">
            <a [routerLink]="['/blog_admin']" class="btn btn-secondary">
              <span class="material-icons">arrow_back</span> Cancel
            </a>
            <button 
              type="submit"
              [disabled]="blogForm.invalid || isSubmitting"
              class="btn btn-primary"
            >
              <span class="material-icons">{{isEditMode ? 'save' : 'add'}}</span>
              {{isSubmitting ? 'Saving...' : (isEditMode ? 'Update' : 'Create')}}
            </button>
          </div>
        </form>
      </div>
    </main>
  `,
  styles: [`
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

    .main-content {
      flex: 1;
      padding: 2rem;
      max-width: 1400px;
      margin: 0 auto;
      width: 100%;
      background: #f5f6fa;
      min-height: 100vh;
      margin-top: 140px;
    }

    .form-container {
      background: white;
      border-radius: 15px;
      padding: 2rem;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
      max-width: 800px;
      margin: 0 auto;
    }

    .blog-form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .form-group label {
      font-weight: 600;
      color: #2c3e50;
      font-size: 0.9rem;
    }

    .form-control {
      padding: 0.8rem;
      border: 2px solid #ecf0f1;
      border-radius: 8px;
      font-size: 1rem;
      transition: all 0.3s ease;
    }

    .form-control:focus {
      border-color: #2ecc71;
      outline: none;
      box-shadow: 0 0 0 2px rgba(46, 204, 113, 0.2);
    }

    textarea.form-control {
      resize: vertical;
      min-height: 150px;
    }

    .checkbox-group {
      flex-direction: row;
      align-items: center;
    }

    .checkbox-container {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
    }

    .checkbox-label {
      font-weight: 500;
      color: #2c3e50;
    }

    .image-upload-container {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .image-preview {
      width: 200px;
      height: 200px;
      object-fit: cover;
      border-radius: 8px;
      border: 2px solid #ecf0f1;
    }

    .file-input {
      padding: 0.8rem;
      border: 2px dashed #ecf0f1;
      border-radius: 8px;
      cursor: pointer;
    }

    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      margin-top: 1rem;
    }

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
      text-decoration: none;
    }

    .btn-primary {
      background: #2ecc71;
      color: white;
    }

    .btn-secondary {
      background: #ecf0f1;
      color: #2c3e50;
    }

    .btn:hover {
      opacity: 0.9;
      transform: translateY(-2px);
    }

    .btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none;
    }

    @media (max-width: 768px) {
      .form-container {
        padding: 1rem;
      }

      .header h1 {
        font-size: 2em;
      }

      .navbar {
        padding: 0.5rem;
      }

      .nav-left, .nav-right {
        flex-wrap: wrap;
        justify-content: center;
      }

      .navbar a {
        padding: 0.5rem 1rem;
        font-size: 0.9em;
      }

      .form-actions {
        flex-direction: column;
      }

      .btn {
        width: 100%;
        justify-content: center;
      }
    }
  `]
})
export class AdminBlogFormComponent implements OnInit {
  blogForm: FormGroup;
  isEditMode = false;
  isSubmitting = false;
  imagePreview: string | null = null;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private blogService: BlogService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.blogForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      category: ['', Validators.required],
      tags: [''],
      readTime: [5, [Validators.required, Validators.min(1)]],
      featured: [false]
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditMode = true;
      this.loadArticle(id);
    }
  }

  loadArticle(id: number) {
    this.blogService.getArticleById(id).subscribe(article => {
      this.blogForm.patchValue({
        title: article.title,
        content: article.content,
        category: article.category,
        tags: article.tags,
        readTime: article.readTime,
        featured: article.featured
      });
      if (article.imageUrl) {
        this.imagePreview = 'data:image/jpeg;base64,' + article.imageUrl;
      }
    });
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  async onSubmit() {
    if (this.blogForm.invalid) return;

    this.isSubmitting = true;
    const formData = this.blogForm.value;
    
    // Convert selected file to base64
    if (this.selectedFile) {
      formData.imageUrl = await this.fileToBase64(this.selectedFile);
    }

    const article: BlogArticle = {
      ...formData,
      id: this.isEditMode ? this.route.snapshot.params['id'] : undefined,
      createdAt: this.isEditMode ? undefined : new Date(),
      updatedAt: new Date()
    };

    const request = this.isEditMode ?
      this.blogService.updateArticle(article.id!, article) :
      this.blogService.createArticle(article);

    request.subscribe({
      next: () => {
        this.router.navigate(['/blog_admin']);
      },
      error: (error) => {
        console.error('Error saving article:', error);
        this.isSubmitting = false;
      }
    });
  }

  private fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result as string;
        // Remove the data URL prefix
        resolve(base64String.split(',')[1]);
      };
      reader.onerror = error => reject(error);
    });
  }
}