import { Component } from '@angular/core';
import { NewsletterComponent} from "../newsletter/newsletter.component";
import {CommonModule} from "@angular/common";
import {Newsletter} from "../newsletter";

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
  readonly baseUrl = 'https://angular.io/assets/images/tutorials/faa';

  housingLocation: Newsletter = {
    id: 9999,
    name: 'Test Home',
    summary: 'Test city',
    category: 'ST',
    photo: `${this.baseUrl}/example-house.jpg`,
    frequency: 'daily',
    description: 'something newsie!',
  };
}
