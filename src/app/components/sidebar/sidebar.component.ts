import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="sidebar">
      <div class="logo">
        <h2>NutriTrack</h2>
      </div>
      <ul class="nav-menu">
        <li>
          <a routerLink="/user" routerLinkActive="active">
            <i class="fas fa-home"></i> Dashboard
          </a>
        </li>
        <li>
          <a routerLink="/meal-planner" routerLinkActive="active">
            <i class="fas fa-utensils"></i> Meal Planner
          </a>
        </li>
        <li>
          <a routerLink="/recipes" routerLinkActive="active">
            <i class="fas fa-book-open"></i> Recipes
          </a>
        </li>
        <li>
          <a routerLink="/exercise" routerLinkActive="active">
            <i class="fas fa-running"></i> Exercise & Yoga
          </a>
        </li>
        <li>
          <a routerLink="/blog" routerLinkActive="active">
            <i class="fas fa-newspaper"></i> Nutrition Blog
          </a>
        </li>
        <li>
          <a routerLink="/calendar" routerLinkActive="active">
            <i class="fas fa-calendar"></i> Calendar
          </a>
        </li>
        <li>
          <a routerLink="/settings" routerLinkActive="active">
            <i class="fas fa-cog"></i> Settings
          </a>
        </li>
      </ul>
      <div class="logout-section">
        <a routerLink="/login" class="logout-btn">
          <i class="fas fa-sign-out-alt"></i> Log Out
        </a>
      </div>
    </div>
  `,
  styles: [`
    :host {
      --primary-color: #2ecc71;
      --secondary-color: #27ae60;
      --text-color: #2c3e50;
      --bg-light: #f5f5f5;
      --bg-white: #ffffff;
      --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.1);
      --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
      --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
      --border-radius: 15px;
      --sidebar-width: 280px;
    }

    .sidebar {
      position: fixed;
      top: 0;
      left: 0;
      width: var(--sidebar-width);
      height: 100vh;
      background: var(--bg-white);
      padding: 2rem;
      box-shadow: var(--shadow-md);
      display: flex;
      flex-direction: column;
      gap: 2rem;
      overflow-y: auto;
      z-index: 1000;
    }

    .logo {
      text-align: center;
      padding: 1rem 0;
    }

    .logo h2 {
      color: var(--primary-color);
      font-size: 2rem;
      margin: 0;
      font-weight: 600;
    }

    .nav-menu {
      list-style: none;
      padding: 0;
      margin: 0;
      flex-grow: 1;
    }

    .nav-menu li {
      margin: 0.5rem 0;
    }

    .nav-menu a {
      display: flex;
      align-items: center;
      padding: 1rem;
      color: var(--text-color);
      text-decoration: none;
      border-radius: 8px;
      transition: all 0.3s ease;
    }

    .nav-menu a:hover {
      background: var(--primary-color);
      color: white;
      transform: translateX(5px);
    }

    .nav-menu a:hover i.fa-book-open {
      transform: rotateY(180deg);
      transition: transform 0.5s ease;
    }

    .nav-menu a.active {
      background: var(--primary-color);
      color: white;
    }

    .nav-menu i {
      margin-right: 12px;
      width: 20px;
      text-align: center;
    }

    .logout-section {
      margin-top: auto;
      padding-top: 1rem;
      border-top: 1px solid var(--bg-light);
    }

    .logout-btn {
      display: flex;
      align-items: center;
      padding: 1rem;
      color: var(--text-color);
      text-decoration: none;
      border-radius: 8px;
      transition: all 0.3s ease;
    }

    .logout-btn:hover {
      background: #ff6b6b;
      color: white;
      transform: translateX(5px);
    }

    .logout-btn i {
      margin-right: 12px;
      width: 20px;
      text-align: center;
    }

    @media (max-width: 768px) {
      .sidebar {
        transform: translateX(-100%);
        transition: transform 0.3s ease;
      }

      .sidebar.active {
        transform: translateX(0);
      }
    }
  `]
})
export class SidebarComponent {}