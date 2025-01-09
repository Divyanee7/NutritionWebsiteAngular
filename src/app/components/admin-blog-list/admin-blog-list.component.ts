import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogService } from '../../services/blog.service';
import { BlogArticle } from '../../models/blog-article';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-admin-blog-list',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
  template: `
    <div class="header-container">
      <header class="header">
        <h1>
          <span class="material-icons">article</span>
          Blog Management
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
      <div class="blog-container">
        <div class="table-header">
          <h2>Blog Articles</h2>
          <a [routerLink]="['/blog_admin/new']" class="btn btn-primary">
            <span class="material-icons">add</span> Create New Article
          </a>
        </div>

        <div *ngIf="articles.length > 0; else noArticles">
          <div class="table-container">
            <table class="blog-table">
              <thead>
                <tr>
                  <th>Title & Image</th>
                  <th>Category</th>
                  <th>Featured</th>
                  <th>Created Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let article of articles">
                  <td>
                    <div class="article-title">
                      <img 
                        [src]="'data:image/jpeg;base64,' + article.imageUrl" 
                        [alt]="article.title"
                        class="article-image"
                      >
                      <span>{{article.title}}</span>
                    </div>
                  </td>
                  <td>{{article.category}}</td>
                  <td>
                    <span [class]="'status-badge ' + (article.featured ? 'status-active' : 'status-inactive')">
                      {{article.featured ? 'Featured' : 'Not Featured'}}
                    </span>
                  </td>
                  <td>{{article.createdAt | date}}</td>
                  <td class="action-buttons">
                    <a [routerLink]="['/blog_admin/edit', article.id]" class="btn btn-primary">
                      <span class="material-icons">edit</span> Edit
                    </a>
                    <button class="btn btn-danger" (click)="deleteArticle(article.id)">
                      <span class="material-icons">delete</span> Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <ng-template #noArticles>
          <div class="no-articles-message">
            <p>No blog articles found.</p>
          </div>
        </ng-template>
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

    .blog-container {
      background: white;
      border-radius: 15px;
      padding: 2rem;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }

    .table-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .table-header h2 {
      font-size: 1.8rem;
      color: #2c3e50;
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

    .btn:hover {
      opacity: 0.9;
      transform: translateY(-2px);
    }

    .table-container {
      overflow-x: auto;
    }

    .blog-table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 0;
      margin-top: 1rem;
    }

    .blog-table th,
    .blog-table td {
      padding: 1rem;
      text-align: left;
      border-bottom: 1px solid #ecf0f1;
    }

    .blog-table th {
      background: #f8f9fa;
      font-weight: 600;
      color: #2c3e50;
      position: sticky;
      top: 0;
    }

    .blog-table tr:hover {
      background: #f8f9fa;
    }

    .article-title {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .article-image {
      width: 60px;
      height: 60px;
      object-fit: cover;
      border-radius: 8px;
    }

    .status-badge {
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-size: 0.9em;
      font-weight: 500;
      display: inline-block;
      text-align: center;
      min-width: 100px;
    }

    .status-active {
      background: #e8f5e9;
      color: #2e7d32;
    }

    .status-inactive {
      background: #ffebee;
      color: #c62828;
    }

    .action-buttons {
      display: flex;
      gap: 0.5rem;
    }

    .no-articles-message {
      text-align: center;
      padding: 2rem;
      color: #7f8c8d;
    }

    @media (max-width: 768px) {
      .table-header {
        flex-direction: column;
      }

      .btn {
        width: 100%;
        justify-content: center;
      }

      .blog-table {
        display: block;
        overflow-x: auto;
        white-space: nowrap;
      }

      .action-buttons {
        flex-direction: column;
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
    }
  `]
})
export class AdminBlogListComponent implements OnInit {
  articles: BlogArticle[] = [];

  constructor(private blogService: BlogService) {}

  ngOnInit() {
    this.loadArticles();
  }

  loadArticles() {
    this.blogService.getAllArticles().subscribe({
      next: (articles) => {
        this.articles = articles;
      },
      error: (error) => {
        console.error('Error loading articles:', error);
        alert('Failed to load articles. Please try again.');
      }
    });
  }

  deleteArticle(id: number) {
    if (confirm('Are you sure you want to delete this article?')) {
      this.blogService.deleteArticle(id).subscribe({
        next: () => {
          this.articles = this.articles.filter(article => article.id !== id);
        },
        error: (error) => {
          console.error('Error deleting article:', error);
          alert('Failed to delete article. Please try again.');
        }
      });
    }
  }
}