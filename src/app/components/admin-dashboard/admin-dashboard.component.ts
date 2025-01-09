import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, MatIconModule],
  template: `
    <!-- Add this in your index.html head section -->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    
    <div class="header-container">
      <header class="header">
        <h1>
          <span class="material-icons">admin_panel_settings</span>
          Admin Dashboard
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
        <a routerLink="/recipes_admin" routerLinkActive="active" class="nav-item">
            <mat-icon>menu_book</mat-icon> Recipes
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
      <div class="users-container">
        <div class="table-header">
          <h2>User Management</h2>
          <button class="btn btn-warning" (click)="exportToExcel()">
            <span class="material-icons">file_download</span> Export to Excel
          </button>
          
          <div class="search-container">
            <div class="search-form">
              <input 
                type="text" 
                [(ngModel)]="searchTerm" 
                (input)="onSearchChange()"
                placeholder="Search users..." 
                class="search-input"
              >
              <button class="btn btn-primary" (click)="search()">
                <span class="material-icons">search</span> Search
              </button>
            </div>
          </div>
        </div>

        <div *ngIf="users.length > 0; else noUsers">
          <div class="table-container">
            <table class="users-table">
              <thead>
                <tr>
                  <th>
                    <button class="sort-button" (click)="sort('userId')">
                      ID
                      <span class="material-icons sort-icon" [class.sort-active]="sortField === 'userId'">
                        {{getSortIcon('userId')}}
                      </span>
                    </button>
                  </th>
                  <th>
                    <button class="sort-button" (click)="sort('name')">
                      Name
                      <span class="material-icons sort-icon" [class.sort-active]="sortField === 'name'">
                        {{getSortIcon('name')}}
                      </span>
                    </button>
                  </th>
                  <th>
                    <button class="sort-button" (click)="sort('email')">
                      Email
                      <span class="material-icons sort-icon" [class.sort-active]="sortField === 'email'">
                        {{getSortIcon('email')}}
                      </span>
                    </button>
                  </th>
                  <th>
                    <button class="sort-button" (click)="sort('phone')">
                      Phone
                      <span class="material-icons sort-icon" [class.sort-active]="sortField === 'phone'">
                        {{getSortIcon('phone')}}
                      </span>
                    </button>
                  </th>
                  <th>
                    <button class="sort-button" (click)="sort('loginName')">
                      Login Name
                      <span class="material-icons sort-icon" [class.sort-active]="sortField === 'loginName'">
                        {{getSortIcon('loginName')}}
                      </span>
                    </button>
                  </th>
                  <th>
                    <button class="sort-button" (click)="sort('enabled')">
                      Status
                      <span class="material-icons sort-icon" [class.sort-active]="sortField === 'enabled'">
                        {{getSortIcon('enabled')}}
                      </span>
                    </button>
                  </th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let user of users">
                  <td>{{user.userId}}</td>
                  <td>{{user.name}}</td>
                  <td>{{user.email}}</td>
                  <td>{{user.phone}}</td>
                  <td>{{user.loginName}}</td>
                  <td>
                    <span [class]="'status-badge ' + (user.enabled ? 'status-active' : 'status-inactive')">
                      {{user.enabled ? 'Active' : 'Inactive'}}
                    </span>
                  </td>
                  <td class="action-buttons">
                    <button class="btn btn-danger" (click)="deleteUser(user)">
                      <span class="material-icons">delete</span> Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <ng-template #noUsers>
          <div class="no-users-message">
            <p>No users found.</p>
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

    .header h1 mat-icon {
      font-size: 32px;
      height: 32px;
      width: 32px;
      color: #f1c40f;
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

    .navbar a mat-icon {
      margin-right: 4px;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
    }

    .btn mat-icon {
      font-size: 20px;
      height: 20px;
      width: 20px;
    }

    .sort-button {
      background: none;
      border: none;
      padding: 0;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      color: #2c3e50;
    }

    .sort-icon {
      font-size: 18px;
      height: 18px;
      width: 18px;
    }

    .sort-active {
      color: #2ecc71;
    }

    .header h1 i {
      margin-right: 15px;
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
     * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'Nunito', sans-serif;
    }

    .main-content {
      flex: 1;
      padding: 2rem;
      max-width: 1400px;
      margin: 0 auto;
      width: 100%;
      background: #f5f6fa;
      min-height: 100vh;
      margin-top: 140px; /* Added to account for fixed header */
    }

    .users-container {
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

    .btn-danger {
      background: #e74c3c;
      color: white;
    }

    .btn-warning {
      background: #f1c40f;
      color: #2c3e50;
    }

    .btn:hover {
      opacity: 0.9;
      transform: translateY(-2px);
    }

    .table-container {
      overflow-x: auto;
    }

    .users-table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 0;
      margin-top: 1rem;
    }

    .users-table th,
    .users-table td {
      padding: 1rem;
      text-align: left;
      border-bottom: 1px solid #ecf0f1;
    }

    .users-table th {
      background: #f8f9fa;
      font-weight: 600;
      color: #2c3e50;
      position: sticky;
      top: 0;
    }

    .users-table tr:hover {
      background: #f8f9fa;
    }

    .users-table tbody tr:last-child td {
      border-bottom: none;
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
      flex-wrap: wrap;
    }

    .action-buttons .btn {
      padding: 0.5rem 1rem;
      font-size: 0.9em;
    }

    .no-users-message {
      text-align: center;
      padding: 2rem;
      color: #7f8c8d;
    }

    .sort-button {
      background: none;
      border: none;
      padding: 0;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      color: #2c3e50;
    }

    .sort-button:hover {
      color: #2ecc71;
    }

    .sort-icon {
      font-size: 0.8em;
    }

    .sort-active {
      color: #2ecc71;
    }

    @media (max-width: 768px) {
      .table-header {
        flex-direction: column;
      }

      .search-form {
        flex-direction: column;
        width: 100%;
      }

      .search-input {
        width: 100%;
      }

      .btn {
        width: 100%;
        justify-content: center;
      }

      .users-table {
        display: block;
        overflow-x: auto;
        white-space: nowrap;
      }

      .users-table th,
      .users-table td {
        min-width: 120px;
      }

      .action-buttons {
        flex-direction: column;
      }
    }
  `]
})
export class AdminDashboardComponent implements OnInit {
  users: User[] = [];
  searchTerm: string = '';
  sortField: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  searchTimer: any;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.getCurrentUser().subscribe(user => {
      if (!user || user.role !== 1) {
        this.router.navigate(['/login']);
        return;
      }
      this.loadUsers();
    });
  }

  loadUsers() {
    this.authService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (error) => {
        console.error('Error loading users:', error);
        alert('Failed to load users. Please try again.');
      }
    });
  }

  deleteUser(user: User) {
    if (!user.userId) return;
    
    if (confirm(`Are you sure you want to delete ${user.name}?`)) {
      this.authService.deleteUser(user.userId).subscribe({
        next: () => {
          this.users = this.users.filter(u => u.userId !== user.userId);
        },
        error: (error) => {
          console.error('Error deleting user:', error);
          alert('Failed to delete user. Please try again.');
        }
      });
    }
  }

  onSearchChange() {
    clearTimeout(this.searchTimer);
    this.searchTimer = setTimeout(() => {
      this.search();
    }, 300);
  }

  search() {
    this.authService.getAllUsers(this.searchTerm).subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (error) => {
        console.error('Error searching users:', error);
        alert('Failed to search users. Please try again.');
      }
    });
  }

  sort(field: string) {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
  }

  getSortIcon(field: string): string {
    if (this.sortField !== field) return 'unfold_more';
    return this.sortDirection === 'asc' ? 'arrow_upward' : 'arrow_downward';
  }

  exportToExcel() {
    this.authService.exportUsersToExcel().subscribe({
      next: (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'users.xlsx';
        link.click();
        window.URL.revokeObjectURL(url);
      },
      error: (error) => {
        console.error('Error exporting users:', error);
        alert('Failed to export users. Please try again.');
      }
    });
  }
}