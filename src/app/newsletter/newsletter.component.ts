import { Component, Input } from '@angular/core';
import { CommonModule } from "@angular/common";
import {Newsletter} from "../newsletter";

@Component({
  selector: 'app-newsletter',
  standalone: true,
  imports: [],
  template: `
    <section class="listing">
      <img class="listing-photo" [src]="newsletter.photo" alt="Exterior photo of {{newsletter.name}}">
      <h2 class="listing-heading">{{ newsletter.name }}</h2>
      <p class="listing-location">{{ newsletter.summary}}<br>Category: {{newsletter.category }}</p>
    </section>
  `,
  styleUrl: './newsletter.component.css'
})
export class NewsletterComponent {
  @Input() newsletter!: Newsletter;
}
