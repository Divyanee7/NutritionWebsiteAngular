import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { BlogArticle } from '../../models/blog-article';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, MatIconModule],
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
        <div class="dashboard-header">
          <div class="header-content">
            <h1 class="text-3xl font-bold">Nutrition Blog</h1>
            <p class="text-gray-600">Discover healthy living tips and nutrition advice</p>
          </div>
          <div class="search-box">
            <mat-icon>search</mat-icon>
            <input type="text" placeholder="Search articles..." class="search-input">
          </div>
        </div>
      
        <!-- Featured Articles -->
        @if (featuredArticles.length > 0) {
          <section class="featured-section">
            <h2 class="section-title">
              <mat-icon>stars</mat-icon>
              Featured Articles
            </h2>
            <div class="featured-grid">
              @for (article of featuredArticles; track article.id) {
                <div class="article-card featured">
                  <img 
                    [src]="'data:image/jpeg;base64,' + article.imageUrl" 
                    [alt]="article.title"
                    class="article-image"
                  >
                  <div class="article-content">
                    <div class="article-category">{{article.category}}</div>
                    <h3 class="article-title">{{article.title}}</h3>
                    <p class="article-excerpt">{{article.excerpt}}</p>
                    <div class="article-footer">
                      <span class="read-time">
                        <mat-icon>schedule</mat-icon>
                        {{article.readTime}} min read
                      </span>
                      <a [routerLink]="['/blog', article.id]" class="read-more">
                        Read More
                        <mat-icon>arrow_forward</mat-icon>
                      </a>
                    </div>
                  </div>
                </div>
              }
            </div>
          </section>
        }

        <!-- Category Filter -->
        <section class="category-section">
          <div class="category-filters">
            @for (category of categories; track category) {
              <button 
                (click)="filterByCategory(category)"
                [class.active]="selectedCategory === category"
                class="category-btn">
                {{category}}
              </button>
            }
          </div>
        </section>

        <!-- All Articles -->
        <section class="articles-section">
          <h2 class="section-title">
            <mat-icon>library_books</mat-icon>
            All Articles
          </h2>
          <div class="articles-grid">
            @for (article of filteredArticles; track article.id) {
              <div class="article-card">
                <img 
                  [src]="'data:image/jpeg;base64,' + article.imageUrl" 
                  [alt]="article.title"
                  class="article-image"
                >
                <div class="article-content">
                  <div class="article-category">{{article.category}}</div>
                  <h3 class="article-title">{{article.title}}</h3>
                  <p class="article-excerpt">{{article.excerpt}}</p>
                  <div class="article-footer">
                    <span class="read-time">
                      <mat-icon>schedule</mat-icon>
                      {{article.readTime}} min read
                    </span>
                    <a [routerLink]="['/blog', article.id]" class="read-more">
                      Read More
                      <mat-icon>arrow_forward</mat-icon>
                    </a>
                  </div>
                </div>
              </div>
            }
          </div>
        </section>
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

    /* Header Styles */
    .dashboard-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--spacing-lg);
    }

    .header-content h1 {
      margin: 0;
      color: var(--text-primary);
    }

    .search-box {
      display: flex;
      align-items: center;
      background: var(--bg-secondary);
      padding: var(--spacing-sm);
      border-radius: var(--radius-sm);
      box-shadow: var(--shadow-sm);
      gap: var(--spacing-sm);
    }

    .search-input {
      border: none;
      outline: none;
      padding: var(--spacing-xs);
      min-width: 250px;
    }

    /* Section Styles */
    .section-title {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
      color: var(--text-primary);
      margin-bottom: var(--spacing-md);
      font-size: 1.5rem;
    }

    /* Featured Section */
    .featured-section {
      margin-bottom: var(--spacing-lg);
    }

    .featured-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: var(--spacing-md);
    }

    /* Category Section */
    .category-section {
      margin-bottom: var(--spacing-lg);
    }

    .category-filters {
      display: flex;
      flex-wrap: wrap;
      gap: var(--spacing-sm);
    }

    .category-btn {
      padding: var(--spacing-sm) var(--spacing-md);
      border: 1px solid var(--primary-color);
      border-radius: var(--radius-sm);
      background: none;
      color: var(--primary-color);
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .category-btn:hover {
      background: var(--primary-light);
    }

    .category-btn.active {
      background: var(--primary-color);
      color: white;
    }

    /* Articles Grid */
    .articles-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: var(--spacing-md);
    }

    /* Article Card */
    .article-card {
      background: var(--bg-secondary);
      border-radius: var(--radius-md);
      overflow: hidden;
      box-shadow: var(--shadow-md);
      transition: transform 0.3s ease;
    }

    .article-card:hover {
      transform: translateY(-5px);
    }

    .article-image {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }

    .article-content {
      padding: var(--spacing-md);
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
      margin: 0 0 var(--spacing-sm) 0;
      color: var(--text-primary);
      font-size: 1.25rem;
    }

    .article-excerpt {
      color: var(--text-secondary);
      margin-bottom: var(--spacing-md);
      line-height: 1.5;
    }

    .article-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .read-time {
      display: flex;
      align-items: center;
      gap: var(--spacing-xs);
      color: var(--text-secondary);
      font-size: 0.9rem;
    }

    .read-more {
      display: flex;
      align-items: center;
      gap: var(--spacing-xs);
      color: var(--primary-color);
      text-decoration: none;
      font-weight: 500;
      transition: color 0.3s ease;
    }

    .read-more:hover {
      color: var(--primary-dark);
    }

    /* Responsive Design */
    @media (max-width: 1024px) {
      .featured-grid {
        grid-template-columns: repeat(2, 1fr);
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

      .dashboard-header {
        flex-direction: column;
        gap: var(--spacing-md);
      }

      .search-box {
        width: 100%;
      }

      .search-input {
        width: 100%;
      }

      .featured-grid,
      .articles-grid {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 480px) {
      .category-filters {
        flex-direction: column;
      }

      .category-btn {
        width: 100%;
        text-align: center;
      }
    }
  `]
})
export class BlogListComponent implements OnInit {
  featuredArticles: BlogArticle[] = [];
  allArticles: BlogArticle[] = [];
  filteredArticles: BlogArticle[] = [];
  categories: string[] = [];
  selectedCategory: string = 'All';
  searchQuery: string = '';

  constructor(private blogService: BlogService) {}

  ngOnInit() {
    this.loadFeaturedArticles();
    this.loadAllArticles();
  }

  loadFeaturedArticles() {
    this.blogService.getFeaturedArticles().subscribe({
      next: (articles) => {
        this.featuredArticles = articles;
      },
      error: (error) => {
        console.error('Error loading featured articles:', error);
      }
    });
  }

  loadAllArticles() {
    this.blogService.getAllArticles().subscribe({
      next: (articles) => {
        this.allArticles = articles;
        this.filteredArticles = articles;
        this.extractCategories(articles);
      },
      error: (error) => {
        console.error('Error loading articles:', error);
      }
    });
  }

  extractCategories(articles: BlogArticle[]) {
    const categorySet = new Set(articles.map(article => article.category));
    this.categories = ['All', ...Array.from(categorySet)];
  }

  filterByCategory(category: string) {
    this.selectedCategory = category;
    if (category === 'All') {
      this.filteredArticles = this.allArticles;
    } else {
      this.filteredArticles = this.allArticles.filter(
        article => article.category === category
      );
    }
  }

  searchArticles(query: string) {
    this.searchQuery = query.toLowerCase();
    this.filteredArticles = this.allArticles.filter(article =>
      article.title.toLowerCase().includes(this.searchQuery) ||
      
      article.category.toLowerCase().includes(this.searchQuery)
    );
  }
}
