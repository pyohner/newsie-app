import { Component } from '@angular/core';
import {NewsstandComponent} from "./newsstand/newsstand.component";
import { RouterModule } from '@angular/router';
import {AuthService} from "./auth.service";
import {AsyncPipe, CommonModule} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NewsstandComponent,
    RouterModule,
    AsyncPipe,
    CommonModule
  ],
  template: `<main>
    <header class="brand-name">
      <div>
      <a [routerLink]="['/']">
          <img class="brand-logo" src="/assets/logo.svg" alt="logo" aria-hidden="true">
        </a>
      </div>
      <div>
        <nav class="nav-bar">
          <a [routerLink]="['/newsstand']" routerLinkActive="active" class="nav-button">The Newsstand</a>
          <a [routerLink]="['/about']" routerLinkActive="active" class="nav-button">About</a>

          <a *ngIf="!(isLoggedIn | async)" [routerLink]="['/login']" routerLinkActive="active" class="login-button">Sign In</a>
          <a *ngIf="!(isLoggedIn | async)" [routerLink]="['/register']" routerLinkActive="active" class="register-button">Register</a>
          <a *ngIf="isLoggedIn | async" (click)="onLogout($event)" [routerLink]="['/login']" routerLinkActive="active" class="logout-button">Sign Out</a>

        </nav>
      </div>
      </header>
    <section class="content">
      <router-outlet></router-outlet>
    </section>
    <hr class="footer-line">
    <footer>
      <p>
        <b>Explore</b>
      </p>
      <p>
        <a [routerLink]="['/']">Home</a>
      </p>
      <p>
        <a [routerLink]="['/newsstand']">The Newsstand</a>
      </p>
      <p>
        <a [routerLink]="['/about']">About</a>
      </p>
      <p>&copy; {{ currentYear }} Newsie. All rights reserved.</p>

    </footer>
  </main>`,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'newsie';
  currentYear: number = new Date().getFullYear();

  isLoggedIn = this.authService.isLoggedIn$;

  constructor(private authService: AuthService) {}

  onLogout(event: Event) {
    event.preventDefault();  // Prevent default behavior of routerLink
    this.authService.logout();  // Call the logout method to clear session
  }

}
