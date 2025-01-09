import { Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { BmiCalculatorComponent } from './components/bmi-calculator/bmi-calculator.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { ExerciseYogaComponent } from './components/exercise-yoga/exercise-yoga.component';
import { AdminRecipesComponent } from './components/admin-recipes/admin-recipes.component';
import { BlogListComponent } from './components/blog-list/blog-list.component';
import { BlogDetailComponent } from './components/blog-detail/blog-detail.component';
import { AdminBlogListComponent } from './components/admin-blog-list/admin-blog-list.component';
import { AdminBlogFormComponent } from './components/admin-blog-form/admin-blog-form.component';
import { ContactComponent } from './components/contact/contact.component';
import { AdminContactComponent } from './components/admin-contact/admin-contact.component';
import { NutritionPlannerComponent } from './components/nutrition-planner/nutrition-planner.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin', component: AdminDashboardComponent },
  { path: 'user', component: UserDashboardComponent },
  { path: 'bmi', component: BmiCalculatorComponent},
  { path: 'recipes', component: RecipesComponent },
  {path:'exercise' ,component:ExerciseYogaComponent},
  {path:'recipes_admin',component:AdminRecipesComponent},
  {path:'blog' ,component:BlogListComponent},
  {path:'blog/:id' ,component:BlogDetailComponent},
  {path:'blog_admin',component:AdminBlogListComponent},
  { path: 'blog_admin/new', component: AdminBlogFormComponent },
  { path: 'blog_admin/edit/:id', component: AdminBlogFormComponent },
  {path:'contact' ,component:ContactComponent},
  {path:'meal-planner' ,component:NutritionPlannerComponent},
  {path:'contact_admin' ,component:AdminContactComponent},
  { path: '**', redirectTo: '' }
];
