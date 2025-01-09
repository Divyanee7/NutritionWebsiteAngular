import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) { }

  login(loginName: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { loginName, password });
  }

  register(user: User): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user);
  }

  getCurrentUser(): Observable<User | null> {
    const userStr = localStorage.getItem('user');
    return of(userStr ? JSON.parse(userStr) : null);
  }

  setCurrentUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getAllUsers(searchTerm?: string): Observable<User[]> {
    let params = new HttpParams();
    if (searchTerm) {
      params = params.set('search', searchTerm);
    }
    return this.http.get<User[]>(`${this.baseUrl}/users`, { params });
  }

  exportUsersToExcel(): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/users/export`, {
      responseType: 'blob'
    });
  }


  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/users/${userId}`);
  }
  updateUserWeight(userId: number, newWeight: number): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/users/update-weight/${userId}`, newWeight);
  }

  logout(): void {
    localStorage.removeItem('user');
  }
}