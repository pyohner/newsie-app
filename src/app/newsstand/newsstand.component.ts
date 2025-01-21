import { Component } from '@angular/core';
import { NewsletterComponent} from "../newsletter/newsletter.component";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-newsstand',
  standalone: true,
  imports: [
    CommonModule,
    NewsletterComponent
  ],
  template: `
    <section>
      <form>
        <input type="text" placeholder="Filter by summary">
        <button class="primary" type="button">Search</button>
      </form>
    </section>
    <section class="results">
      <app-newsletter></app-newsletter>
    </section>
  `,
  styleUrl: './newsstand.component.css'
})
export class NewsstandComponent {

}
