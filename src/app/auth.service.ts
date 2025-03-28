import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3333/api';
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadUserFromStorage(); // Load stored user on service init
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }).pipe(
      map(response => {
        if (response && response.user) {
          this.isLoggedInSubject.next(true);
          localStorage.setItem('user', JSON.stringify(response.user));
          return true;
        }
        return false;
      }),
      catchError(error => {
        console.error("Login error:", error);
        return of(false);
      })
    );
  }


  logout() {
    this.isLoggedInSubject.next(false);
    localStorage.removeItem('user');
  }

  getUserId(): number | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).id : null;
  }

  private loadUserFromStorage() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.isLoggedInSubject.next(true); // Restore logged-in state
    }
  }

  register(username: string, email: string, password: string): Observable<boolean> {
    return this.http.post<any>(`${this.apiUrl}/users`, { username, email, password }).pipe(
      map(response => {
        if (response.id) {
          console.log("User registered successfully:", response);
          return true; // Registration success
        }
        return false; // Registration failure
      }),
      catchError(error => {
        console.error("Registration error:", error);
        return of(false);
      })
    );
  }

}
