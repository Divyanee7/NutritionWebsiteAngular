import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

interface Exercise {
  title: string;
  description: string;
  videoUrl: string;
  duration: string;
  difficulty: string;
  calories: string;
  category: string;
  tips: string[];
}

interface YogaPose {
  name: string;
  sanskritName: string;
  description: string;
  benefits: string[];
  videoUrl: string;
  difficulty: string;
  duration: string;
  category: string;
}

@Component({
  selector: 'app-exercise-yoga',
  standalone: true,
  imports: [
    CommonModule, 
    MatIconModule, 
    MatTabsModule, 
    MatCardModule, 
    MatButtonModule,
    RouterModule
  ],
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
        <div class="exercise-yoga-container">
          <header class="page-header">
            <div class="header-content">
              <h1>Exercise & Yoga</h1>
              <p>Discover workouts and yoga poses for your wellness journey</p>
            </div>
            <div class="quick-stats">
              <div class="stat-item">
                <mat-icon>whatshot</mat-icon>
                <span>Weekly Activity</span>
                <strong>3.5 hours</strong>
              </div>
              <div class="stat-item">
                <mat-icon>emoji_events</mat-icon>
                <span>Streak</span>
                <strong>5 days</strong>
              </div>
            </div>
          </header>

          <mat-tab-group class="custom-tabs" animationDuration="500ms">
            <!-- Exercise Tab -->
            <mat-tab>
              <ng-template matTabLabel>
                <mat-icon>fitness_center</mat-icon>
                <span>Exercises</span>
              </ng-template>
              
              <div class="category-filters">
                <button 
                  *ngFor="let category of exerciseCategories" 
                  (click)="filterExercises(category)"
                  [class.active]="selectedExerciseCategory === category"
                  class="filter-btn">
                  {{category}}
                </button>
              </div>

              <div class="cards-grid">
                <mat-card *ngFor="let exercise of filteredExercises" class="workout-card">
                  <mat-card-header>
                    <mat-card-title>{{exercise.title}}</mat-card-title>
                    <mat-card-subtitle>
                      <span class="difficulty-badge" [class]="exercise.difficulty.toLowerCase()">
                        {{exercise.difficulty}}
                      </span>
                    </mat-card-subtitle>
                  </mat-card-header>

                  <div class="video-container">
                    <iframe 
                      [src]="getSafeUrl(exercise.videoUrl)" 
                      frameborder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowfullscreen>
                    </iframe>
                  </div>

                  <mat-card-content>
                    <p class="description">{{exercise.description}}</p>
                    
                    <div class="workout-details">
                      <div class="detail-item">
                        <mat-icon>schedule</mat-icon>
                        <span>{{exercise.duration}}</span>
                      </div>
                      <div class="detail-item">
                        <mat-icon>local_fire_department</mat-icon>
                        <span>{{exercise.calories}}</span>
                      </div>
                    </div>

                    <div class="tips-section">
                      <h4>Key Tips:</h4>
                      <ul>
                        <li *ngFor="let tip of exercise.tips">{{tip}}</li>
                      </ul>
                    </div>

                    <button mat-button class="start-workout-btn">
                      <mat-icon>play_circle</mat-icon>
                      Start Workout
                    </button>
                  </mat-card-content>
                </mat-card>
              </div>
            </mat-tab>

            <!-- Yoga Tab -->
            <mat-tab>
              <ng-template matTabLabel>
                <mat-icon>self_improvement</mat-icon>
                <span>Yoga</span>
              </ng-template>

              <div class="category-filters">
                <button 
                  *ngFor="let category of yogaCategories" 
                  (click)="filterYoga(category)"
                  [class.active]="selectedYogaCategory === category"
                  class="filter-btn">
                  {{category}}
                </button>
              </div>

              <div class="cards-grid">
                <mat-card *ngFor="let pose of filteredYogaPoses" class="yoga-card">
                  <mat-card-header>
                    <mat-card-title>{{pose.name}}</mat-card-title>
                    <mat-card-subtitle>
                      {{pose.sanskritName}}
                      <span class="difficulty-badge" [class]="pose.difficulty.toLowerCase()">
                        {{pose.difficulty}}
                      </span>
                    </mat-card-subtitle>
                  </mat-card-header>

                  <div class="video-container">
                    <iframe 
                      [src]="getSafeUrl(pose.videoUrl)" 
                      frameborder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowfullscreen>
                    </iframe>
                  </div>

                  <mat-card-content>
                    <p class="description">{{pose.description}}</p>

                    <div class="workout-details">
                      <div class="detail-item">
                        <mat-icon>schedule</mat-icon>
                        <span>{{pose.duration}}</span>
                      </div>
                      <div class="detail-item">
                        <mat-icon>category</mat-icon>
                        <span>{{pose.category}}</span>
                      </div>
                    </div>

                    <div class="benefits-section">
                      <h4>Benefits:</h4>
                      <ul>
                        <li *ngFor="let benefit of pose.benefits">{{benefit}}</li>
                      </ul>
                    </div>

                    <button mat-button class="start-workout-btn">
                      <mat-icon>play_circle</mat-icon>
                      Start Practice
                    </button>
                  </mat-card-content>
                </mat-card>
              </div>
            </mat-tab>
          </mat-tab-group>
        </div>
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

    .nav-item mat-icon {
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

    .logout-btn mat-icon {
      margin-right: var(--spacing-sm);
    }

    /* Main Content Styles */
    .main-content {
      flex: 1;
      margin-left: 280px;
      padding: var(--spacing-lg);
    }

    .exercise-yoga-container {
      max-width: 1400px;
      margin: 0 auto;
    }

    .page-header {
      margin-bottom: var(--spacing-lg);
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: var(--bg-secondary);
      padding: var(--spacing-md);
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-md);
    }

    .header-content h1 {
      color: var(--text-primary);
      font-size: 2rem;
      margin: 0;
    }

    .header-content p {
      color: var(--text-secondary);
      margin-top: var(--spacing-xs);
    }

    .quick-stats {
      display: flex;
      gap: var(--spacing-md);
    }

    .stat-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: var(--spacing-sm);
      background: var(--primary-light);
      border-radius: var(--radius-sm);
      min-width: 120px;
    }

    .stat-item mat-icon {
      color: var(--primary-dark);
      margin-bottom: var(--spacing-xs);
    }

    .stat-item span {
      color: var(--text-secondary);
      font-size: 0.9rem;
    }

    .stat-item strong {
      color: var(--primary-dark);
      font-size: 1.2rem;
    }

    .category-filters {
      display: flex;
      gap: var(--spacing-sm);
      margin-bottom: var(--spacing-md);
      flex-wrap: wrap;
    }

    .filter-btn {
      padding: var(--spacing-xs) var(--spacing-sm);
      border: 2px solid var(--primary-color);
      background: transparent;
      color: var(--primary-color);
      border-radius: var(--radius-sm);
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .filter-btn.active {
      background: var(--primary-color);
      color: white;
    }

    .filter-btn:hover {
      background: var(--primary-light);
      border-color: var(--primary-dark);
    }

    /* Complete the cards-grid styles */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--spacing-md);
  padding: var(--spacing-md) 0;
}

/* Material Tab Group Custom Styles */
.custom-tabs {
  background: var(--bg-secondary);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
  box-shadow: var(--shadow-md);
}

::ng-deep .mat-mdc-tab-header {
  margin-bottom: var(--spacing-md);
}

::ng-deep .mat-mdc-tab {
  min-width: 120px;
}

::ng-deep .mat-mdc-tab-body-content {
  padding: var(--spacing-sm) 0;
}

/* Card Styles Enhancement */
mat-card {
  overflow: hidden;
}

.workout-card, .yoga-card {
  height: 100%;
  display: flex;
  flex-direction: column;
}

mat-card-header {
  padding: var(--spacing-md);
  border-bottom: 1px solid rgba(0,0,0,0.1);
}

mat-card-content {
  padding: var(--spacing-md);
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

/* Start Workout Button Styles */
.start-workout-btn {
  margin-top: auto;
  width: 100%;
  padding: var(--spacing-sm);
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  transition: all 0.3s ease;
}

.start-workout-btn:hover {
  background-color: var(--primary-dark);
  transform: translateY(-2px);
}

.start-workout-btn mat-icon {
  font-size: 20px;
  height: 20px;
  width: 20px;
}

/* Enhanced Video Container */
.video-container {
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
  margin-bottom: var(--spacing-sm);
  border-radius: var(--radius-sm);
  box-shadow: var(--shadow-sm);
}

.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
}

/* Difficulty Badge Enhancements */
.difficulty-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Mobile Responsiveness Enhancement */
@media (max-width: 1024px) {
  .cards-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
  
  .quick-stats {
    flex-wrap: wrap;
  }
  
  .stat-item {
    flex: 1 1 calc(50% - var(--spacing-md));
    min-width: auto;
  }
}

@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    gap: var(--spacing-md);
  }
  
  .quick-stats {
    width: 100%;
  }
  
  .category-filters {
    justify-content: center;
  }
  
  .filter-btn {
    flex: 0 1 auto;
    min-width: 120px;
    text-align: center;
  }
}

@media (max-width: 480px) {
  :host {
    padding: var(--spacing-sm);
  }
  
  .stat-item {
    flex: 1 1 100%;
  }
  
  .filter-btn {
    min-width: 100px;
    font-size: 0.9rem;
  }
  
  mat-card-header {
    padding: var(--spacing-sm);
  }
  
  mat-card-content {
    padding: var(--spacing-sm);
  }
}

/* Print styles for workout plans */
@media print {
  .sidebar,
  .video-container,
  .start-workout-btn {
    display: none;
  }
  
  .main-content {
    margin: 0;
    padding: 20px;
  }
  
  .cards-grid {
    grid-template-columns: 1fr;
  }
  
  .workout-card,
  .yoga-card {
    break-inside: avoid;
    box-shadow: none;
    border: 1px solid #ddd;
  }
}
  `]
})
export class ExerciseYogaComponent {
  exerciseCategories = ['All', 'Cardio', 'Strength', 'HIIT', 'Core', 'Flexibility'];
  yogaCategories = ['All', 'Beginner', 'Vinyasa', 'Hatha', 'Restorative', 'Power'];
  
  selectedExerciseCategory = 'All';
  selectedYogaCategory = 'All';

  constructor(private sanitizer: DomSanitizer) {}

  exercises: Exercise[] = [
    {
      title: 'Full Body HIIT',
      description: 'A high-intensity interval training workout targeting all major muscle groups',
      videoUrl: 'https://www.youtube.com/embed/ml6cT4AZdqI',
      duration: '30 mins',
      difficulty: 'Intermediate',
      calories: '300-400 kcal',
      category: 'HIIT',
      tips: [
        'Keep proper form throughout',
        'Take breaks when needed',
        'Stay hydrated',
        'Follow the tempo'
      ]
    },
    {
      title: 'Core Strength',
      description: 'Build a strong core with this focused ab workout routine',
      videoUrl: 'https://www.youtube.com/embed/ml6cT4AZdqI',
      duration: '20 mins',
      difficulty: 'Beginner',
      calories: '150-200 kcal',
      category: 'Core',
      tips: [
        'Engage your core throughout',
        'Breathe steadily',
        'Keep your lower back pressed to the ground',
        'Quality over quantity'
      ]
    },
    // Add more exercises as needed
  ];

  yogaPoses: YogaPose[] = [
    {
      name: 'Sun Salutation',
      sanskritName: 'Surya Namaskar',
      description: 'A sequence of 12 powerful yoga poses with profound benefits for body and mind',
      benefits: [
        'Improves blood circulation',
        'Strengthens muscles and joints',
        'Enhances flexibility',
        'Calms the mind'
      ],
      videoUrl: 'https://www.youtube.com/embed/EC7RGJ975iM',
      difficulty: 'Beginner',
      duration: '15 mins',
      category: 'Vinyasa'
    },
    {
      name: 'Downward-Facing Dog',
      sanskritName: 'Adho Mukha Svanasana',
      description: 'A foundational yoga pose that stretches and strengthens the entire body',
      benefits: [
        'Strengthens arms and legs',
        'Lengthens the spine',
        'Calms the nervous system',
        'Improves digestion'
      ],
      videoUrl: 'https://www.youtube.com/embed/EC7RGJ975iM',
      difficulty: 'Beginner',
      duration: '5 mins',
      category: 'Hatha'
    },
    // Add more yoga poses as needed
  ];

  get filteredExercises(): Exercise[] {
    return this.exercises.filter(exercise => 
      this.selectedExerciseCategory === 'All' || 
      exercise.category === this.selectedExerciseCategory
    );
  }

  get filteredYogaPoses(): YogaPose[] {
    return this.yogaPoses.filter(pose => 
      this.selectedYogaCategory === 'All' || 
      pose.category === this.selectedYogaCategory
    );
  }

  filterExercises(category: string): void {
    this.selectedExerciseCategory = category;
  }

  filterYoga(category: string): void {
    this.selectedYogaCategory = category;
  }

  getSafeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

// Add more exercises and yoga poses data
const additionalExercises: Exercise[] = [
  {
    title: 'Cardio Kickboxing',
    description: 'High-energy kickboxing routine combining martial arts and cardio movements',
    videoUrl: 'https://www.youtube.com/embed/6oLg5fFe5ww',
    duration: '45 mins',
    difficulty: 'Intermediate',
    calories: '400-500 kcal',
    category: 'Cardio',
    tips: [
      'Keep your guard up',
      'Stay light on your feet',
      'Fully extend your strikes',
      'Engage your core during combinations'
    ]
  },
  {
    title: 'Strength Training Basics',
    description: 'Fundamental strength training exercises for building muscle and improving form',
    videoUrl: 'https://www.youtube.com/embed/U0bhE67HuDY',
    duration: '40 mins',
    difficulty: 'Beginner',
    calories: '250-300 kcal',
    category: 'Strength',
    tips: [
      'Start with lighter weights to perfect form',
      'Breathe out during exertion',
      'Keep controlled movements',
      'Rest between sets'
    ]
  },
  {
    title: 'Advanced HIIT Circuit',
    description: 'Challenging high-intensity circuit training for experienced fitness enthusiasts',
    videoUrl: 'https://www.youtube.com/embed/Mvo2snJGhtM',
    duration: '35 mins',
    difficulty: 'Advanced',
    calories: '450-550 kcal',
    category: 'HIIT',
    tips: [
      'Maintain intensity during work periods',
      'Use proper form even when tired',
      'Take full recovery breaks',
      'Scale exercises as needed'
    ]
  }
];

const additionalYogaPoses: YogaPose[] = [
  {
    name: 'Power Vinyasa Flow',
    sanskritName: 'Vinyasa Krama',
    description: 'Dynamic flowing sequence linking breath with movement',
    benefits: [
      'Builds strength and flexibility',
      'Improves cardiovascular fitness',
      'Enhances mind-body connection',
      'Increases endurance'
    ],
    videoUrl: 'https://www.youtube.com/embed/oX6I6vs1EFs',
    difficulty: 'Advanced',
    duration: '60 mins',
    category: 'Power'
  },
  {
    name: 'Restorative Yoga Sequence',
    sanskritName: 'Vishrama Yoga',
    description: 'Gentle, relaxing poses held for longer durations with props',
    benefits: [
      'Reduces stress and anxiety',
      'Promotes deep relaxation',
      'Improves sleep quality',
      'Helps with recovery'
    ],
    videoUrl: 'https://www.youtube.com/embed/EHt_DHxFUY',
    difficulty: 'Beginner',
    duration: '45 mins',
    category: 'Restorative'
  },
  {
    name: 'Traditional Hatha Sequence',
    sanskritName: 'Hatha Yoga Pradipika',
    description: 'Classical yoga poses with focus on alignment and breathing',
    benefits: [
      'Improves posture',
      'Increases body awareness',
      'Balances energy levels',
      'Strengthens core muscles'
    ],
    videoUrl: 'https://www.youtube.com/embed/z3-vxuOSpPA',
    difficulty: 'Intermediate',
    duration: '50 mins',
    category: 'Hatha'
  }
];