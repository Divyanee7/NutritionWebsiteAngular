import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Meal, MealPlan } from '../models/meal';

@Injectable({
  providedIn: 'root'
})
export class MealService {
  private apiUrl = 'http://localhost:8080/api/meals';

  constructor(private http: HttpClient) {}

  getMealPlan(userId: number, date: string): Observable<MealPlan> {
    return this.http.get<MealPlan>(`${this.apiUrl}/plan/${userId}/${date}`);
  }

  getMealSuggestions(dietaryType: string, mealType: string): Observable<Meal[]> {
    return this.http.get<Meal[]>(`${this.apiUrl}/suggestions/${dietaryType}/${mealType}`);
  }

  // addMealToPlan(userId: number, date: string, mealPlanItem: MealPlanItem): Observable<MealPlan> {
  //   return this.http.post<MealPlan>(`${this.apiUrl}/plan/${userId}/${date}`, mealPlanItem);
  // }

  removeMealFromPlan(userId: number, date: string, mealPlanItemId: number): Observable<MealPlan> {
    return this.http.delete<MealPlan>(`${this.apiUrl}/plan/${userId}/${date}/${mealPlanItemId}`);
  }

  uploadMealImage(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('image', file);
    return this.http.post<string>(`${this.apiUrl}/upload-image`, formData);
  }
}
