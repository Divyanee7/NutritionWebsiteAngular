import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { BmiCalculatorComponent } from './components/bmi-calculator/bmi-calculator.component';
import { AdminRecipesComponent } from './components/admin-recipes/admin-recipes.component';
import { BlogListComponent } from './components/blog-list/blog-list.component';
import { BlogDetailComponent } from './components/blog-detail/blog-detail.component';
import { AdminBlogListComponent } from './components/admin-blog-list/admin-blog-list.component';
import { AdminBlogFormComponent } from './components/admin-blog-form/admin-blog-form.component';
import { ContactComponent } from './components/contact/contact.component';
import { AdminContactComponent } from './components/admin-contact/admin-contact.component';
import { NutritionPlannerComponent } from './components/nutrition-planner/nutrition-planner.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    FormsModule,
    LandingPageComponent,
    LoginComponent,
    RegisterComponent,
    AdminDashboardComponent,
    UserDashboardComponent,
    BmiCalculatorComponent,
    AdminRecipesComponent,
    BlogListComponent,
    BlogDetailComponent,
    AdminBlogListComponent,
    AdminBlogFormComponent,
    ContactComponent,
    AdminContactComponent,
    NutritionPlannerComponent
  ],
  template: `<router-outlet></router-outlet>`
})
export class AppComponent {
  title = 'nutrition-website';
}