import { Component } from '@angular/core';
import {NewsstandComponent} from "./newsstand/newsstand.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NewsstandComponent
  ],
  template: `<main>
    <header class="brand-name">
      <img class="brand-logo" src="/assets/logo.svg" alt="logo" aria-hidden="true">
    </header>
    <section class="content">
      <app-newsstand></app-newsstand>
    </section>
  </main>`,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'newsie';
}
