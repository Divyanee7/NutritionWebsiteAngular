import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard-container">
      <!-- Header Section -->
      <header class="dashboard-header">
        <h1>Welcome, {{user?.name}}!</h1>
        <p class="last-update">Last updated: {{currentDate | date:'medium'}}</p>
      </header>

      <!-- Health Stats Overview -->
      <div class="stats-grid">
        <div class="stat-card">
          <h3>Current Weight</h3>
          <div class="stat-value">{{user?.weight}} kg</div>
          <div class="stat-progress" *ngIf="user?.targetWeight">
            <div class="progress-text">
              {{getWeightProgress()}}kg to goal
            </div>
            <div class="progress-bar">
              <div class="progress" [style.width]="getWeightProgressPercentage() + '%'"></div>
            </div>
          </div>
        </div>

        <div class="stat-card">
          <h3>BMI</h3>
          <div class="stat-value">{{calculateBMI() | number:'1.1-1'}}</div>
          <div class="stat-status" [ngClass]="getBMICategory()">
            {{getBMICategory()}}
          </div>
        </div>

        <div class="stat-card">
          <h3>Goal Progress</h3>
          <div class="stat-value">{{user?.primaryGoal | titlecase}}</div>
          <div class="weekly-goal">
            {{user?.weeklyGoal}}kg/week
          </div>
        </div>

        <div class="stat-card">
          <h3>Activity Level</h3>
          <div class="stat-value">{{user?.activityLevel | titlecase}}</div>
        </div>
      </div>

      <!-- Weight Chart -->
      

      <!-- Detailed Information -->
      <div class="details-grid">
        <div class="detail-card">
          <h3>Personal Information</h3>
          <ul>
            <li><strong>Age:</strong> {{user?.age}} years</li>
            <li><strong>Gender:</strong> {{user?.gender | titlecase}}</li>
            <li><strong>Height:</strong> {{user?.height}} cm</li>
          </ul>
        </div>

        <div class="detail-card">
          <h3>Dietary Preferences</h3>
          <ul>
            <li><strong>Diet Type:</strong> {{user?.dietaryPreferences | titlecase}}</li>
            <li><strong>Allergies:</strong> {{user?.foodAllergies || 'None reported'}}</li>
          </ul>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }

    .dashboard-header {
      margin-bottom: 30px;
      border-bottom: 2px solid #eee;
      padding-bottom: 15px;
    }

    .dashboard-header h1 {
      margin: 0;
      color: #2c3e50;
      font-size: 2em;
    }

    .last-update {
      color: #7f8c8d;
      font-size: 0.9em;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 20px;
      margin-bottom: 30px;
    }

    .stat-card {
      background: white;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .stat-card h3 {
      margin: 0;
      color: #7f8c8d;
      font-size: 1em;
    }

    .stat-value {
      font-size: 2em;
      font-weight: bold;
      color: #2c3e50;
      margin: 10px 0;
    }

    .stat-progress {
      margin-top: 10px;
    }

    .progress-bar {
      height: 6px;
      background: #eee;
      border-radius: 3px;
      overflow: hidden;
      margin-top: 5px;
    }

    .progress {
      height: 100%;
      background: #3498db;
      transition: width 0.3s ease;
    }

    .progress-text {
      font-size: 0.9em;
      color: #7f8c8d;
    }

    .chart-section {
      background: white;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      margin-bottom: 30px;
    }

    .chart-container {
      height: 300px;
    }

    .details-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
    }

    .detail-card {
      background: white;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .detail-card ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .detail-card li {
      margin: 10px 0;
      color: #2c3e50;
    }

    .stat-status {
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 0.9em;
      text-align: center;
    }

    .stat-status.Underweight { background: #ffeaa7; }
    .stat-status.Normal { background: #55efc4; }
    .stat-status.Overweight { background: #fab1a0; }
    .stat-status.Obese { background: #ff7675; }
  `]
})
export class UserDashboardComponent implements OnInit {
  user: User | null = null;
  currentDate = new Date();
  
  weightChartData: any;
  chartOptions: any;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.getCurrentUser().subscribe({
      next: (user) => {
        if (user) {
          this.user = user;
          
        } else {
          this.router.navigate(['/login']);
        }
      },
      error: (error) => {
        console.error('Error fetching user data:', error);
        this.router.navigate(['/login']);
      }
    });
  }

  calculateBMI(): number {
    if (this.user?.height && this.user?.weight) {
      const heightInMeters = this.user.height / 100;
      return this.user.weight / (heightInMeters * heightInMeters);
    }
    return 0;
  }

  getBMICategory(): string {
    const bmi = this.calculateBMI();
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Normal';
    if (bmi < 30) return 'Overweight';
    return 'Obese';
  }

  getWeightProgress(): number {
    if (this.user?.weight && this.user?.targetWeight) {
      return Math.abs(this.user.weight - this.user.targetWeight);
    }
    return 0;
  }

  getWeightProgressPercentage(): number {
    if (this.user?.weight && this.user?.targetWeight) {
      const totalToLose = Math.abs(this.user.weight - this.user.targetWeight);
      const progress = (totalToLose / this.user.weight) * 100;
      return Math.min(progress, 100);
    }
    return 0;
  }

}