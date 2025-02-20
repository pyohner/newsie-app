import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  template: `
    <main>
      <h1 class="title">Newsie</h1>
<!--    <form class="login-form">-->
<!--      <div class="form-container">-->
<!--        <div class="form-group">-->
<!--          <label for="name">Name</label>-->
<!--          <input type="text" id="name" name="name">-->
<!--        </div>-->
<!--        <div class="form-group">-->
<!--          <label for="email">Email</label>-->
<!--          <input type="email" id="email" name="email">-->
<!--        </div>-->
<!--        <div class="form-group">-->
<!--          <label for="password">Password</label>-->
<!--          <input type="password" id="password" name="password">-->
<!--        </div>-->
<!--        <button type="submit">Register</button>-->
<!--      </div>-->
<!--    </form>-->

      <form [formGroup]="registerForm" (ngSubmit)="onRegister()" class="login-form">
        <div class="form-container">
          <div class="form-group">
            <label for="username">Name</label>
            <input type="text" id="username" formControlName="username">
            <div class="error" *ngIf="registerForm.get('username')?.invalid && registerForm.get('username')?.touched">
              Name is required.
            </div>
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" formControlName="email">
            <div class="error" *ngIf="registerForm.get('email')?.invalid && registerForm.get('email')?.touched">
              Valid email is required.
            </div>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" formControlName="password">
            <div class="error" *ngIf="registerForm.get('password')?.invalid && registerForm.get('password')?.touched">
              Password is required.
            </div>
          </div>
          <button type="submit" [disabled]="registerForm.invalid">Register</button>
        </div>
        <p class="error" *ngIf="errorMessage">{{ errorMessage }}</p>
      </form>
    </main>
  `,
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  authService = inject(AuthService);
  router = inject(Router);
  fb = inject(FormBuilder);

  registerForm: FormGroup;
  errorMessage: string = '';

  constructor() {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onRegister() {
    if (this.registerForm.valid) {
      const { username, email, password } = this.registerForm.value;

      this.authService.register(username, email, password).subscribe(success => {
        if (success) {
          console.log("Registration successful!");
          this.router.navigate(['/login']); // Redirect to login page
        } else {
          this.errorMessage = "Registration failed. Try again.";
        }
      });
    }
  }

}
