import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { UpdateWeightDialogComponent, WeightDialogData } from '../update-weight-dialog/update-weight-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
interface WeightDialogResult {
  weight: number;
}

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule,UpdateWeightDialogComponent],
  template: `
    <div class="dashboard-layout">
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

      <main class="main-content">
        <header class="dashboard-header">
          <div class="user-welcome">
            <div class="user-info">
              <h1>Welcome, {{user?.name}}!👋</h1>
              <div class="user-details">
                <p><mat-icon>email</mat-icon> {{user?.email}}</p>
                <p><mat-icon>phone</mat-icon> {{user?.phone}}</p>
                <p><mat-icon>wc</mat-icon> {{user?.gender}}</p>
                <p><mat-icon>cake</mat-icon> Age: {{user?.age}}</p>
              </div>
            </div>
          </div>
          <div class="quick-actions">
            <button class="action-btn">
              <mat-icon>add</mat-icon> Log Meal
            </button>
           <button class="action-btn" (click)="openUpdateWeightDialog()">
  <mat-icon>monitor_weight</mat-icon> Update Weight
</button>
          </div>
        </header>

        <section class="stats-grid">
          <!-- Weight Card -->
          <div class="stat-card weight">
            <div class="stat-icon">
              <mat-icon>monitor_weight</mat-icon>
            </div>
            <div class="stat-content">
              <h3>Current Weight</h3>
              <p class="stat-value">{{user?.weight}} kg</p>
              <div class="progress-container" *ngIf="user?.targetWeight">
                <div class="progress-info">
                  <span>Progress to Goal</span>
                  <span>{{getWeightProgressPercentage() | number:'1.0-0'}}%</span>
                </div>
                <div class="progress-bar">
                  <div class="progress" [style.width.%]="getWeightProgressPercentage()"></div>
                </div>
                <p class="goal-text">
                  {{getWeightProgress()}}kg to {{user!.weight > user!.targetWeight ? 'lose' : 'gain'}}
                </p>
              </div>
            </div>
          </div>

          <!-- BMI Card -->
          <div class="stat-card bmi">
            <div class="stat-icon">
              <mat-icon>calculate</mat-icon>
            </div>
            <div class="stat-content">
              <h3>BMI Status</h3>
              <p class="stat-value">{{calculateBMI() | number:'1.1-1'}}</p>
              <div class="bmi-indicator">
                <div class="bmi-status" [ngClass]="getBMICategory().toLowerCase()">
                  {{getBMICategory()}}
                </div>
                <div class="bmi-scale">
                  <div class="scale-markers">
                    <span class="marker" style="left: 0%">18.5</span>
                    <span class="marker" style="left: 50%">25</span>
                    <span class="marker" style="left: 100%">30</span>
                  </div>
                  <div class="scale-bar">
                    <div class="current-bmi" [style.left.%]="getBMIPercentage()"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Weekly Goal Card -->
          <div class="stat-card goals">
            <div class="stat-icon">
              <mat-icon>track_changes</mat-icon>
            </div>
            <div class="stat-content">
              <h3>Weekly Goal</h3>
              <p class="stat-value">{{user?.weeklyGoal}} kg</p>
              <p class="goal-type">{{user?.primaryGoal | titlecase}}</p>
            </div>
          </div>

          <!-- Activity Level Card -->
          <div class="stat-card activity">
            <div class="stat-icon">
              <mat-icon>directions_run</mat-icon>
            </div>
            <div class="stat-content">
              <h3>Activity Level</h3>
              <p class="stat-value">{{user?.activityLevel | titlecase}}</p>
              <p class="activity-desc">Based on your daily routine</p>
            </div>
          </div>
        </section>

        <!-- Water Intake Tracker -->
        <section class="water-tracker-section">
          <div class="water-tracker-card">
            <div class="card-header">
              <h3><mat-icon>water_drop</mat-icon> Water Intake</h3>
              <div class="water-controls">
                <button class="water-btn" (click)="updateWaterIntake(-250)">
                  <mat-icon>remove</mat-icon>
                </button>
                <div class="water-display">
                  <span>{{waterIntake}}</span>
                  <span class="water-unit">ml</span>
                </div>
                <button class="water-btn" (click)="updateWaterIntake(250)">
                  <mat-icon>add</mat-icon>
                </button>
              </div>
            </div>
            <div class="progress-bar">
              <div class="progress" [style.width.%]="(waterIntake / waterGoal) * 100"></div>
            </div>
            <div class="water-details">
              <p class="water-glasses">
                <mat-icon>local_drink</mat-icon>
                {{waterIntake / 250 | number:'1.1-1'}} glasses
              </p>
              <p class="daily-goal">Goal: {{waterGoal}} ml</p>
            </div>
          </div>
        </section>

        <!-- Calorie Tracker -->
        <section class="calorie-tracker-section">
          <div class="calorie-card">
            <div class="card-header">
              <h3><mat-icon>local_fire_department</mat-icon> Daily Calories</h3>
            </div>
            <div class="calories-breakdown">
              <div class="breakdown-item">
                <mat-icon>grain</mat-icon>
                <span>Carbs</span>
                <div class="progress-bar">
                  <div class="progress" [style.width.%]="75"></div>
                </div>
                <p>150g / 200g</p>
              </div>
              <div class="breakdown-item">
                <mat-icon>egg</mat-icon>
                <span>Protein</span>
                <div class="progress-bar">
                  <div class="progress" [style.width.%]="60"></div>
                </div>
                <p>48g / 80g</p>
              </div>
              <div class="breakdown-item">
                <mat-icon>cookie</mat-icon>
                <span>Fats</span>
                <div class="progress-bar">
                  <div class="progress" [style.width.%]="45"></div>
                </div>
                <p>27g / 60g</p>
              </div>
            </div>
            <div class="total-calories">
              <p>Total Daily Calories: 1500 / 2000</p>
              <div class="progress-bar">
                <div class="progress" [style.width.%]="75"></div>
              </div>
            </div>
          </div>
        </section>

        <section class="details-section">
          <div class="details-grid">
            <!-- Profile Information -->
            <div class="detail-card profile">
              <h3><mat-icon>person</mat-icon> Profile Information</h3>
              <div class="detail-content">
                <div class="detail-item">
                  <span>Age</span>
                  <strong>{{user?.age}} years</strong>
                </div>
                <div class="detail-item">
                  <span>Gender</span>
                  <strong>{{user?.gender | titlecase}}</strong>
                </div>
                <div class="detail-item">
                  <span>Height</span>
                  <strong>{{user?.height}} cm</strong>
                </div>
                <div class="detail-item">
                  <span>Email</span>
                  <strong>{{user?.email}}</strong>
                </div>
                <div class="detail-item">
                  <span>Phone</span>
                  <strong>{{user?.phone}}</strong>
                </div>
              </div>
            </div>

            <!-- Dietary Information -->
            <div class="detail-card dietary">
              <h3><mat-icon>restaurant</mat-icon> Dietary Information</h3>
              <div class="detail-content">
                <div class="detail-item">
                  <span>Diet Type</span>
                  <strong>{{user?.dietaryPreferences | titlecase}}</strong>
                </div>
                <div class="detail-item">
                  <span>Allergies</span>
                  <strong>{{user?.foodAllergies || 'None reported'}}</strong>
                </div>
                <div class="detail-item">
                  <span>Target Weight</span>
                  <strong>{{user?.targetWeight}} kg</strong>
                </div>
              </div>
            </div>
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

    .nav-item i {
      width: 24px;
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

    .logout-btn i {
      margin-right: var(--spacing-sm);
    }

    /* Main Content Styles */
    .main-content {
      flex: 1;
      margin-left: 280px;
      padding: var(--spacing-lg);
    }

    .dashboard-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--spacing-lg);
    }

    .greeting h1 {
      font-size: 2rem;
      color: var(--text-primary);
      margin: 0;
    }

    .subtitle {
      color: var(--text-secondary);
      margin-top: var(--spacing-xs);
    }

    .quick-actions {
      display: flex;
      gap: var(--spacing-sm);
    }

    .action-btn {
      padding: var(--spacing-sm) var(--spacing-md);
      background: var(--primary-color);
      color: white;
      border: none;
      border-radius: var(--radius-sm);
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: var(--spacing-xs);
    }

    .action-btn:hover {
      background: var(--primary-dark);
      transform: translateY(-2px);
    }

    /* Stats Grid */
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: var(--spacing-md);
      margin-bottom: var(--spacing-lg);
    }

    .stat-card {
      background: var(--bg-secondary);
      padding: var(--spacing-md);
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-md);
      display: flex;
      gap: var(--spacing-md);
      transition: transform 0.3s ease;
    }

    .stat-card:hover {
      transform: translateY(-5px);
    }

    .stat-icon {
      width: 48px;
      height: 48px;
      background: var(--primary-light);
      border-radius: var(--radius-sm);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .stat-icon i {
      font-size: 1.5rem;
      color: var(--primary-dark);
    }

    .stat-content {
      flex: 1;
    }

    .stat-content h3 {
      margin: 0;
      color: var(--text-secondary);
      font-size: 1rem;
      font-weight: 500;
    }

    .stat-value {
      font-size: 1.8rem;
      font-weight: 700;
      color: var(--text-primary);
      margin: var(--spacing-xs) 0;
    }

    /* Progress Bar */
    .progress-container {
      margin-top: var(--spacing-sm);
    }

    .progress-info {
      display: flex;
      justify-content: space-between;
      color: var(--text-secondary);
      font-size: 0.9rem;
      margin-bottom: var(--spacing-xs);
    }

    .progress-bar {
      height: 8px;
      background: var(--primary-light);
      border-radius: 4px;
      overflow: hidden;
    }

    .progress {
      height: 100%;
      background: var(--primary-color);
      border-radius: 4px;
      transition: width 0.3s ease;
    }

    .goal-text {
      text-align: center;
      color: var(--text-secondary);
      font-size: 0.9rem;
      margin-top: var(--spacing-xs);
    }

    /* BMI Specific */
    .bmi-status {
      display: inline-block;
      padding: var(--spacing-xs) var(--spacing-sm);
      border-radius: var(--radius-sm);
      font-weight: 600;
      text-align: center;
      margin: var(--spacing-xs) 0;
    }

    .bmi-status.underweight {
      background: #ffeaa7;
      color: #b7791f;
    }

    .bmi-status.normal {
      background: #c6f6d5;
      color: #2f855a;
    }

    .bmi-status.overweight {
      background: #feebc8;
      color: #c05621;
    }

    .bmi-status.obese {
      background: #fed7d7;
      color: #c53030;
    }

    .bmi-scale {
      margin-top: var(--spacing-sm);
    }

    .scale-markers {
      position: relative;
      height: 20px;
      margin-bottom: 5px;
    }

    .marker {
      position: absolute;
      transform: translateX(-50%);
      font-size: 0.8rem;
      color: var(--text-secondary);
    }

    .scale-bar {
      height: 6px;
      background: var(--primary-light);
      border-radius: 3px;
      position: relative;
    }

    .current-bmi {
      position: absolute;
      width: 12px;
      height: 12px;
      background: var(--primary-color);
      border-radius: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      transition: left 0.3s ease;
    }

    /* Details Section */
    .details-section {
      margin-top: var(--spacing-lg);
    }

    .details-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: var(--spacing-md);
    }

    .detail-card {
      background: var(--bg-secondary);
      padding: var(--spacing-md);
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-md);
    }

    .detail-card h3 {
      color: var(--text-primary);
      font-size: 1.2rem;
      margin: 0 0 var(--spacing-md) 0;
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
    }

    .detail-card h3 i {
      color: var(--primary-color);
    }

    .detail-content {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-sm);
    }

    .detail-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--spacing-xs) 0;
      border-bottom: 1px solid rgba(0,0,0,0.05);
    }

    .detail-item:last-child {
      border-bottom: none;
    }

    .detail-item span {
      color: var(--text-secondary);
    }

    .detail-item strong {
      color: var(--text-primary);
    }

    /* Activity Level Card */
    .activity-desc {
      color: var(--text-secondary);
      font-size: 0.9rem;
      margin-top: var(--spacing-xs);
    }

    /* Responsive Design */
    @media (max-width: 1024px) {
      .stats-grid {
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

      .dashboard-header {
        flex-direction: column;
        gap: var(--spacing-md);
      }

      .stats-grid {
        grid-template-columns: 1fr;
      }

      .details-grid {
        grid-template-columns: 1fr;
      }

      .greeting h1 {
        font-size: 1.5rem;
      }

      .stat-card {
        padding: var(--spacing-sm);
      }

      .quick-actions {
        width: 100%;
      }

      .action-btn {
        flex: 1;
        justify-content: center;
      }
    }

    @media (max-width: 480px) {
      .quick-actions {
        flex-direction: column;
      }

      .stat-value {
        font-size: 1.5rem;
      }

      .detail-item {
        flex-direction: column;
        align-items: flex-start;
        gap: var(--spacing-xs);
      }
    }
   .water-tracker-section {
      margin-top: var(--spacing-lg);
    }

    .water-tracker-card {
      background: var(--bg-secondary);
      padding: var(--spacing-md);
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-md);
    }

    .water-controls {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
    }

    .water-btn {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: none;
      background: var(--primary-color);
      color: white;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
    }

    .water-display {
      background: var(--bg-primary);
      padding: var(--spacing-sm) var(--spacing-md);
      border-radius: var(--radius-sm);
      font-weight: bold;
      min-width: 100px;
      text-align: center;
    }

    /* Calorie Tracker Styles */
    .calorie-tracker-section {
      margin-top: var(--spacing-lg);
    }

    .calorie-card {
      background: var(--bg-secondary);
      padding: var(--spacing-md);
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-md);
    }

    .calories-breakdown {
      margin-top: var(--spacing-md);
      display: grid;
      gap: var(--spacing-md);
    }

    .breakdown-item {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
    }

    .breakdown-item .progress-bar {
      flex: 1;
      height: 8px;
      background: var(--bg-primary);
      border-radius: 4px;
      overflow: hidden;
    }

    .total-calories {
      margin-top: var(--spacing-md);
      padding-top: var(--spacing-md);
      border-top: 1px solid var(--bg-primary);
    }

    /* Responsive Design Updates */
    @media (max-width: 768px) {
      .water-tracker-card,
      .calorie-card {
        padding: var(--spacing-sm);
      }

      .calories-breakdown {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class UserDashboardComponent implements OnInit {
  user: User | null = null;
  waterIntake: number = 1500;
  waterGoal: number = 2000;
  showWeightDialog = false;
  constructor(
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog 
  ) {}

  // openUpdateWeightDialog(): void {
  //   const dialogRef = this.dialog.open<UpdateWeightDialogComponent, { currentWeight: number }, WeightDialogResult>(
  //     UpdateWeightDialogComponent,
  //     {
  //       width: '400px',
  //       data: { currentWeight: this.user?.weight || 0 }
  //     }
  //   );

  //   dialogRef.afterClosed().subscribe((result: WeightDialogResult | undefined) => {
  //     if (result?.weight && this.user?.userId) {
  //       this.handleWeightUpdate(result.weight);
  //     }
  //   });
  // }
  openUpdateWeightDialog(): void {
    const dialogRef = this.dialog.open<UpdateWeightDialogComponent, WeightDialogData, WeightDialogResult>(
      UpdateWeightDialogComponent,
      {
        width: '400px',
        data: { currentWeight: this.user?.weight || 0 }
      }
    );
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result?.weight && this.user?.userId) {
        this.handleWeightUpdate(result.weight);
      }
    });
  }


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
  handleWeightUpdate(newWeight: number) {
    if (this.user?.userId) {
      this.authService.updateUserWeight(this.user.userId, newWeight).subscribe({
        next: (updatedUser) => {
          this.user = updatedUser;
          this.authService.setCurrentUser(updatedUser);
          // Show success message using a snackbar or toast
        },
        error: (error) => {
          console.error('Error updating weight:', error);
          // Show error message using a snackbar or toast
        }
      });
    }
  }
  getBMIPercentage(): number {
    const bmi = this.calculateBMI();
    if (bmi < 18.5) return (bmi / 18.5) * 33;
    if (bmi < 25) return 33 + ((bmi - 18.5) / 6.5) * 33;
    if (bmi < 30) return 66 + ((bmi - 25) / 5) * 34;
    return 100;
  }

  getWeightProgress(): number {
    if (this.user?.weight && this.user?.targetWeight) {
      return Math.abs(this.user.weight - this.user.targetWeight);
    }
    return 0;
  }

  getWeightProgressPercentage(): number {
    if (this.user?.weight && this.user?.targetWeight) {
      const initialDifference = Math.abs(this.user.weight - this.user.targetWeight);
      const currentDifference = this.getWeightProgress();
      const progress = ((initialDifference - currentDifference) / initialDifference) * 100;
      return Math.min(progress, 100);
    }
    return 0;
  }
  updateWaterIntake(amount: number) {
    this.waterIntake = Math.max(0, Math.min(this.waterIntake + amount, 4000));
  }
}