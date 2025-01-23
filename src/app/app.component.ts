import { Component } from '@angular/core';
import {NewsstandComponent} from "./newsstand/newsstand.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NewsstandComponent,
    RouterModule
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
        </nav>
      </div>
      </header>
    <section class="content">
      <router-outlet></router-outlet>
    </section>
    <footer>
      <h5>
        Explore
      </h5>
      <p>
        <a [routerLink]="['/']">Home</a>
      </p>
      <p>
        <a [routerLink]="['/newsstand']">Newsstand</a>
      </p>
      <p>
        <a [routerLink]="['/about']">About</a>
      </p>

    </footer>
  </main>`,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'newsie';
}
