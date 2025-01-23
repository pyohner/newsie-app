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
    <p>
      Featured Subscriptions
    </p>
    <section class="results">
      <app-featured></app-featured>
    </section>
  `,
  styleUrl: './home.component.css'
})
export class HomeComponent {


}
