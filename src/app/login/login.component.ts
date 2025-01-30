import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import {FormsModule} from "@angular/forms";
import { NgIf } from '@angular/common';
import {Router} from "@angular/router";


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule, NgIf
  ],
  template: `
    <main>
    <h1 class="title">Newsie</h1>

    <form class="login-form" (ngSubmit)="login()">
      <div class="form-container">
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" name="email" [(ngModel)]="email" required>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" name="password" [(ngModel)]="password" required>
      </div>
        <div class="form-group">
        <button type="submit">Sign In</button>
      <a class="forgot-password" href="forgot-password">Forgot password?</a>
        </div>
      </div>
    </form>
    </main>
  `,
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    if (this.email && this.password) {
      this.authService.login(this.email, this.password).subscribe(success => {
        if (success) {
          //alert('Valid credentials');
          this.router.navigate(['/']); // Redirect on success
        } else {
          alert('Invalid credentials');
        }
      });
    } else {
      alert('Please enter both email and password.');
    }
  }
}
