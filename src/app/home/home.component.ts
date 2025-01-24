import {Component} from '@angular/core';
import { NewsletterComponent} from "../newsletter/newsletter.component";
import {CommonModule} from "@angular/common";
import {FeaturedComponent} from "../featured/featured.component";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    NewsletterComponent,
    FeaturedComponent
  ],
  template: `
    <div class="hero-section">
      <div class="hero-content">
        <h1>Newsie</h1>
        <h3>It's all you need to know.</h3>
      </div>
    </div>
    <main>
    <h2>
      Featured Subscriptions
    </h2>
    <section class="results">
      <app-featured></app-featured>
    </section>
    </main>
  `,
  styleUrl: './home.component.css'
})
export class HomeComponent {


}
