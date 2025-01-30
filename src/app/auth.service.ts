import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users';
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<boolean> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(users => {
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
          this.isLoggedInSubject.next(true);
          localStorage.setItem('user', JSON.stringify(user)); // Store user data
          return true; // Success
        }
        return false; // Failure
      }),
      catchError(() => of(false)) // Handle errors gracefully
    );
  }

  logout() {
    this.isLoggedInSubject.next(false);
    localStorage.removeItem('user');
  }
}
