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
    <a [routerLink]="['/']">
      <header class="brand-name">
        <img class="brand-logo" src="/assets/logo.svg" alt="logo" aria-hidden="true">
      </header>
    </a>
    <section class="content">
      <router-outlet></router-outlet>
    </section>
  </main>`,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'newsie';
}
