import { Component } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
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
            <div class="button-group">
            <button type="button" class="cancel-btn" onclick="location.href='login'">Cancel</button>
            <button type="submit" class="submit-btn">Email Password</button>
          </div>
          </div>
        </div>
      </form>
    </main>
  `,
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {

}
