import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipe } from '../models/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private apiUrl = 'http://localhost:8080/api/recipes';

  constructor(private http: HttpClient) {}

  getAllRecipes(search?: string): Observable<Recipe[]> {
    let url = this.apiUrl;
    if (search) {
      url += `?search=${encodeURIComponent(search)}`;
    }
    return this.http.get<Recipe[]>(url);
  }

  getRecipeById(id: number): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.apiUrl}/${id}`);
  }

  getRecipeImage(recipeId: number): string {
    return `${this.apiUrl}/image/${recipeId}`;
  }

  createRecipe(recipe: Recipe): Observable<Recipe> {
    const formData = new FormData();
    
    // Append all recipe data
    Object.keys(recipe).forEach(key => {
      if (key !== 'imageFile') {
        formData.append(key, recipe[key as keyof Recipe]?.toString() ?? '');
      }
    });

    // Append image file if exists
    if (recipe.imageFile) {
      formData.append('image', recipe.imageFile);
    }

    return this.http.post<Recipe>(this.apiUrl, formData);
  }

  updateRecipe(recipe: Recipe): Observable<Recipe> {
    const formData = new FormData();
    
    Object.keys(recipe).forEach(key => {
      if (key !== 'imageFile') {
        formData.append(key, recipe[key as keyof Recipe]?.toString() ?? '');
      }
    });

    if (recipe.imageFile) {
      formData.append('image', recipe.imageFile);
    }

    return this.http.put<Recipe>(`${this.apiUrl}/${recipe.recipeId}`, formData);
  }
  deleteRecipe(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}