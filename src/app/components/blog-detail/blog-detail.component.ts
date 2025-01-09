import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { BlogArticle } from '../../models/blog-article';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, MatIconModule],
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
        @if (article) {
          <div class="article-container">
            <div class="breadcrumb">
              <a routerLink="/blog" class="back-link">
                <mat-icon>arrow_back</mat-icon>
                Back to Articles
              </a>
            </div>

            <article class="article-detail">
              <img 
                [src]="'data:image/jpeg;base64,' + article.imageUrl" 
                [alt]="article.title"
                class="article-hero-image"
              >

              <div class="article-header">
                <div class="article-category">{{article.category}}</div>
                <h1 class="article-title">{{article.title}}</h1>
                
                <div class="article-meta">
                  <div class="meta-item">
                    <mat-icon>person</mat-icon>
                    <span>{{article.author}}</span>
                  </div>
                  <div class="meta-item">
                    <mat-icon>schedule</mat-icon>
                    <span>{{article.readTime}} min read</span>
                  </div>
                  <div class="meta-item">
                    <mat-icon>calendar_today</mat-icon>
                    <span>{{article.createdAt | date}}</span>
                  </div>
                </div>
              </div>

              <div class="article-content" [innerHTML]="article.content"></div>

              @if (article.tags) {
                <div class="article-tags">
                  <h3 class="tags-title">
                    <mat-icon>local_offer</mat-icon>
                    Tags
                  </h3>
                  <div class="tags-list">
                    @for (tag of article.tags.split(','); track tag) {
                      <span class="tag-item">{{tag.trim()}}</span>
                    }
                  </div>
                </div>
              }
            </article>
          </div>
        }
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

    /* Layout Styles */
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
      gap: var(--spacing-sm);
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
      gap: var(--spacing-sm);
    }

    .logout-btn:hover {
      background: #ff6b6b;
      color: white;
    }

    /* Main Content Styles */
    .main-content {
      flex: 1;
      margin-left: 280px;
      padding: var(--spacing-lg);
    }

    /* Article Container */
    .article-container {
      max-width: 900px;
      margin: 0 auto;
    }

    /* Breadcrumb */
    .breadcrumb {
      margin-bottom: var(--spacing-md);
    }

    .back-link {
      display: flex;
      align-items: center;
      gap: var(--spacing-xs);
      color: var(--primary-color);
      text-decoration: none;
      font-weight: 500;
      transition: color 0.3s ease;
    }

    .back-link:hover {
      color: var(--primary-dark);
    }

    /* Article Detail */
    .article-detail {
      background: var(--bg-secondary);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-lg);
      overflow: hidden;
    }

    .article-hero-image {
      width: 100%;
      height: 400px;
      object-fit: cover;
    }

    .article-header {
      padding: var(--spacing-lg);
    }

    .article-category {
      display: inline-block;
      padding: var(--spacing-xs) var(--spacing-sm);
      background: var(--primary-light);
      color: var(--primary-dark);
      border-radius: var(--radius-sm);
      font-size: 0.9rem;
      margin-bottom: var(--spacing-sm);
    }

    .article-title {
      font-size: 2.5rem;
      color: var(--text-primary);
      margin: 0 0 var(--spacing-md) 0;
      line-height: 1.2;
    }

    .article-meta {
      display: flex;
      gap: var(--spacing-md);
      color: var(--text-secondary);
    }

    .meta-item {
      display: flex;
      align-items: center;
      gap: var(--spacing-xs);
    }

    .article-content {
      padding: 0 var(--spacing-lg) var(--spacing-lg);
      line-height: 1.8;
      color: var(--text-primary);
    }

    .article-tags {
      padding: var(--spacing-lg);
      border-top: 1px solid rgba(0,0,0,0.1);
    }

    .tags-title {
      display: flex;
      align-items: center;
      gap: var(--spacing-xs);
      color: var(--text-primary);
      font-size: 1.2rem;
      margin-bottom: var(--spacing-md);
    }

    .tags-list {
      display: flex;
      flex-wrap: wrap;
      gap: var(--spacing-xs);
    }

    .tag-item {
      padding: var(--spacing-xs) var(--spacing-sm);
      background: var(--bg-primary);
      color: var(--text-secondary);
      border-radius: var(--radius-sm);
      font-size: 0.9rem;
    }

    /* Responsive Design */
    @media (max-width: 1024px) {
      .article-container {
        max-width: 100%;
      }
    }

    @media (max-width: 768px) {
      .sidebar {
        transform: translateX(-100%);
        position: fixed;
      }

      .main-content {
        margin-left: 0;
        padding: var(--spacing-md);
      }

      .article-title {
        font-size: 2rem;
      }

      .article-meta {
        flex-direction: column;
        gap: var(--spacing-sm);
      }
    }

    @media (max-width: 480px) {
      .article-header {
        padding: var(--spacing-md);
      }

      .article-content {
        padding: 0 var(--spacing-md) var(--spacing-md);
      }

      .article-hero-image {
        height: 250px;
      }
    }
  `]
})
export class BlogDetailComponent implements OnInit {
  article: BlogArticle | null = null;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.loadArticle(id);
    });
  }

  loadArticle(id: number) {
    this.blogService.getArticleById(id).subscribe({
      next: (article) => {
        this.article = article;
      },
      error: (error) => {
        console.error('Error loading article:', error);
      }
    });
  }
}