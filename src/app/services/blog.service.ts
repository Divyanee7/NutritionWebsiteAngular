import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BlogArticle } from '../models/blog-article';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private apiUrl = 'http://localhost:8080/api/blog';
  
  constructor(private http: HttpClient) {}

  // Get all articles with optional pagination
  getAllArticles(page: number = 0, size: number = 10): Observable<BlogArticle[]> {
    const params = { page: page.toString(), size: size.toString() };
    return this.http.get<BlogArticle[]>(this.apiUrl, { params }).pipe(
      catchError(this.handleError)
    );
  }

  // Get featured articles
  getFeaturedArticles(): Observable<BlogArticle[]> {
    return this.http.get<BlogArticle[]>(`${this.apiUrl}/featured`).pipe(
      catchError(this.handleError)
    );
  }

  // Get single article by ID
  getArticleById(id: number): Observable<BlogArticle> {
    return this.http.get<BlogArticle>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Get articles by category
  getArticlesByCategory(category: string): Observable<BlogArticle[]> {
    return this.http.get<BlogArticle[]>(`${this.apiUrl}/category/${category}`).pipe(
      catchError(this.handleError)
    );
  }

  // Create new article
  createArticle(article: BlogArticle): Observable<BlogArticle> {
    return this.http.post<BlogArticle>(this.apiUrl, article).pipe(
      catchError(this.handleError)
    );
  }

  // Update existing article
  updateArticle(id: number, article: BlogArticle): Observable<BlogArticle> {
    return this.http.put<BlogArticle>(`${this.apiUrl}/${id}`, article).pipe(
      catchError(this.handleError)
    );
  }

  // Delete article
  deleteArticle(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Toggle featured status
  toggleFeatured(id: number, featured: boolean): Observable<BlogArticle> {
    return this.http.patch<BlogArticle>(`${this.apiUrl}/${id}/featured`, { featured }).pipe(
      catchError(this.handleError)
    );
  }

  // Get total count of articles
  getBlogCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count`).pipe(
      catchError(this.handleError)
    );
  }

  // Search articles
  searchArticles(query: string): Observable<BlogArticle[]> {
    const params = { q: query };
    return this.http.get<BlogArticle[]>(`${this.apiUrl}/search`, { params }).pipe(
      catchError(this.handleError)
    );
  }

  // Upload image for article
  uploadImage(id: number, imageFile: File): Observable<string> {
    const formData = new FormData();
    formData.append('image', imageFile);

    return this.http.post(`${this.apiUrl}/${id}/image`, formData, {
      responseType: 'text'
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Convert File to base64
  fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result as string;
        // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
        resolve(base64String.split(',')[1]);
      };
      reader.onerror = error => reject(error);
    });
  }

  // Get article categories
  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/categories`).pipe(
      catchError(this.handleError)
    );
  }

  // Handle HTTP errors
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  // Update article status
  updateArticleStatus(id: number, status: string): Observable<BlogArticle> {
    return this.http.patch<BlogArticle>(`${this.apiUrl}/${id}/status`, { status }).pipe(
      catchError(this.handleError)
    );
  }

  // Bulk delete articles
  bulkDeleteArticles(ids: number[]): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/bulk-delete`, { ids }).pipe(
      catchError(this.handleError)
    );
  }

  // Bulk update articles status
  bulkUpdateStatus(ids: number[], status: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/bulk-status`, { ids, status }).pipe(
      catchError(this.handleError)
    );
  }
}