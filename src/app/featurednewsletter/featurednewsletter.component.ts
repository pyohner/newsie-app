import { Component, Input } from '@angular/core';
// import { CommonModule } from "@angular/common";
import {Newsletter} from "../newsletter";
import {RouterLink, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-featurednewsletter',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet
  ],
  template: `
    <section class="listing">
      <img class="listing-photo" [src]="newsletter.photo" alt="Exterior photo of {{newsletter.name}}">
      <div class="listing-details">
        <h2 class="listing-heading">{{ newsletter.name }}</h2>
        <p class="listing-summary">{{ newsletter.summary }}<br>Category: {{ newsletter.category }}</p>
        <a [routerLink]="['/details', newsletter.id]">Learn More</a>
      </div>
    </section>
  `,
  styleUrl: './featurednewsletter.component.css'
})
export class FeaturednewsletterComponent {
  @Input() newsletter!: Newsletter;
}
