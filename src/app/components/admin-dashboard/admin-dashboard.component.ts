import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="admin-container">
      <header class="dashboard-header">
        <h1>Admin Dashboard</h1>
        <div class="header-actions">
          <input 
            type="text" 
            placeholder="Search users..." 
            (input)="searchUsers($event)"
            class="search-input"
          >
        </div>
      </header>

      <div class="users-table-container">
        <table class="users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Primary Goal</th>
              <th>Dietary Preference</th>
              <th>Activity Level</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            @for (user of filteredUsers; track user.) {
              <tr>
                <td>{{user.name}}</td>
                <td>{{user.email}}</td>
                <td>{{user.age}}</td>
                <td>{{user.gender}}</td>
                <td>{{user.primaryGoal}}</td>
                <td>{{user.dietaryPreferences}}</td>
                <td>{{user.activityLevel}}</td>
                <td>
                  <span [class]="user.enabled ? 'status-active' : 'status-inactive'">
                    {{user.enabled ? 'Active' : 'Inactive'}}
                  </span>
                </td>
                <td class="actions-cell">
                  <button (click)="viewUserDetails(user)" class="btn-view">
                    View
                  </button>
                  <button 
                    (click)="toggleUserStatus(user)" 
                    [class]="user.enabled ? 'btn-disable' : 'btn-enable'"
                  >
                    {{user.enabled ? 'Disable' : 'Enable'}}
                  </button>
                </td>
              </tr>
            } @empty {
              <tr>
                <td colspan="9" class="no-data">No users found</td>
              </tr>
            }
          </tbody>
        </table>
      </div>

      @if (selectedUser) {
        <div class="user-details-modal">
          <div class="modal-content">
            <h2>User Details</h2>
            <div class="user-details-grid">
              <div class="detail-item">
                <label>Name:</label>
                <span>{{selectedUser.name}}</span>
              </div>
              <div class="detail-item">
                <label>Email:</label>
                <span>{{selectedUser.email}}</span>
              </div>
              <div class="detail-item">
                <label>Phone:</label>
                <span>{{selectedUser.phone}}</span>
              </div>
              <div class="detail-item">
                <label>Age:</label>
                <span>{{selectedUser.age}}</span>
              </div>
              <div class="detail-item">
                <label>Height:</label>
                <span>{{selectedUser.height}} cm</span>
              </div>
              <div class="detail-item">
                <label>Weight:</label>
                <span>{{selectedUser.weight}} kg</span>
              </div>
              <div class="detail-item">
                <label>Target Weight:</label>
                <span>{{selectedUser.targetWeight}} kg</span>
              </div>
              <div class="detail-item">
                <label>Weekly Goal:</label>
                <span>{{selectedUser.weeklyGoal}} kg</span>
              </div>
              <div class="detail-item">
                <label>Food Allergies:</label>
                <span>{{selectedUser.foodAllergies || 'None'}}</span>
              </div>
            </div>
            <button (click)="closeUserDetails()" class="btn-close">Close</button>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .admin-container {
      padding: 24px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .dashboard-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }

    .search-input {
      padding: 8px 16px;
      border: 1px solid #ddd;
      border-radius: 4px;
      width: 300px;
    }

    .users-table-container {
      overflow-x: auto;
    }

    .users-table {
      width: 100%;
      border-collapse: collapse;
      background: white;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .users-table th,
    .users-table td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #eee;
    }

    .users-table th {
      background: #f5f5f5;
      font-weight: 600;
    }

    .actions-cell {
      display: flex;
      gap: 8px;
    }

    .btn-view,
    .btn-enable,
    .btn-disable {
      padding: 6px 12px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 500;
    }

    .btn-view {
      background: #2196f3;
      color: white;
    }

    .btn-enable {
      background: #4caf50;
      color: white;
    }

    .btn-disable {
      background: #f44336;
      color: white;
    }

    .status-active {
      color: #4caf50;
      font-weight: 500;
    }

    .status-inactive {
      color: #f44336;
      font-weight: 500;
    }

    .no-data {
      text-align: center;
      color: #666;
      padding: 24px;
    }

    .user-details-modal {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .modal-content {
      background: white;
      padding: 24px;
      border-radius: 8px;
      max-width: 600px;
      width: 90%;
      max-height: 90vh;
      overflow-y: auto;
    }

    .user-details-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
      margin: 24px 0;
    }

    .detail-item {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .detail-item label {
      font-weight: 500;
      color: #666;
    }

    .btn-close {
      width: 100%;
      padding: 12px;
      background: #666;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  `]
})
export class AdminDashboardComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  selectedUser: User | null = null;

  constructor(private userService: AuthService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.filteredUsers = users;
      },
      error: (error) => {
        console.error('Error loading users:', error);
        alert('Failed to load users. Please try again.');
      }
    });
  }

  searchUsers(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredUsers = this.users.filter(user =>
      user.name.toLowerCase().includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm) ||
      user.primaryGoal.toLowerCase().includes(searchTerm)
    );
  }

  viewUserDetails(user: User) {
    this.selectedUser = user;
  }

  closeUserDetails() {
    this.selectedUser = null;
  }

  toggleUserStatus(user: User) {
    const updatedUser = { ...user, enabled: !user.enabled };
    this.userService.updateUser(updatedUser).subscribe({
      next: () => {
        user.enabled = !user.enabled;
        alert(`User ${user.enabled ? 'enabled' : 'disabled'} successfully`);
      },
      error: (error) => {
        console.error('Error updating user status:', error);
        alert('Failed to update user status. Please try again.');
      }
    });
  }
}