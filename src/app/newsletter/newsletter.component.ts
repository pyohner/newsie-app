import { Component, Input } from '@angular/core';
// import { CommonModule } from "@angular/common";
import {Newsletter} from "../newsletter";
import {RouterLink, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-newsletter',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet
  ],
  template: `
    <section class="listing">
      <img class="listing-photo" [src]="newsletter.photo" alt="Exterior photo of {{newsletter.name}}">
      <h2 class="listing-heading">{{ newsletter.name }}</h2>
<!--      <p class="listing-summary">{{ newsletter.summary }}<br>Category: {{ newsletter.category }}</p>-->
      <a [routerLink]="['/details', newsletter.id]">Learn More</a>
    </section>
  `,
  styleUrl: './newsletter.component.css'
})
export class NewsletterComponent {
  @Input() newsletter!: Newsletter;
}
