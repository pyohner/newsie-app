import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  template: `
    <main>
    <h1 class="title">Newsie</h1>

    <form class="login-form">
      <div class="form-container">
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" name="email">
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" name="password">
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

}
