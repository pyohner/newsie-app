import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [],
  template: `
    <main>
      <h1 class="title">Newsie</h1>
    <form class="login-form">
      <div class="form-container">
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" id="name" name="name">
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" name="email">
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" name="password">
        </div>
        <button type="submit">Register</button>
      </div>
    </form>
    </main>
  `,
  styleUrl: './register.component.css'
})
export class RegisterComponent {

}
