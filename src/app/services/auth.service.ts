import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  logout(): void {
    localStorage.removeItem('user');
  }
}