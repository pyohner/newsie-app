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
      <app-newsletter
        *ngFor="let newsletter of newsletterList"
        [newsletter]="newsletter">
      </app-newsletter>
    </section>
  `,
  styleUrl: './newsstand.component.css'
})
export class NewsstandComponent {
  readonly baseUrl = 'https://angular.io/assets/images/tutorials/faa';

  newsletterList: Newsletter[] = [
    {
      id: 0,
      name: 'Test Home',
      summary: 'Test city',
      category: 'ST',
      photo: `${this.baseUrl}/bernard-hermant-CLKGGwIBTaY-unsplash.jpg`,
      frequency: 'daily',
      description: 'something newsie!',
    },
    {
      id: 1,
      name: 'Test Home',
      summary: 'Test city',
      category: 'ST',
      photo: `${this.baseUrl}/brandon-griggs-wR11KBaB86U-unsplash.jpg`,
      frequency: 'daily',
      description: 'something newsie!',
    },
    {
      id: 2,
      name: 'Test Home',
      summary: 'Test city',
      category: 'ST',
      photo: `${this.baseUrl}/i-do-nothing-but-love-lAyXdl1-Wmc-unsplash.jpg`,
      frequency: 'daily',
      description: 'something newsie!',
    },
    {
      id: 3,
      name: 'Test Home',
      summary: 'Test city',
      category: 'ST',
      photo: `${this.baseUrl}/ian-macdonald-W8z6aiwfi1E-unsplash.jpg`,
      frequency: 'daily',
      description: 'something newsie!',
    },
    {
      id: 4,
      name: 'Test Home',
      summary: 'Test city',
      category: 'ST',
      photo: `${this.baseUrl}/krzysztof-hepner-978RAXoXnH4-unsplash.jpg`,
      frequency: 'daily',
      description: 'something newsie!',
    },
    {
      id: 5,
      name: 'Test Home',
      summary: 'Test city',
      category: 'ST',
      photo: `${this.baseUrl}/r-architecture-JvQ0Q5IkeMM-unsplash.jpg`,
      frequency: 'daily',
      description: 'something newsie!',
    },
    {
      id: 6,
      name: 'Test Home',
      summary: 'Test city',
      category: 'ST',
      photo: `${this.baseUrl}/phil-hearing-IYfp2Ixe9nM-unsplash.jpg`,
      frequency: 'daily',
      description: 'something newsie!',
    },
    {
      id: 7,
      name: 'Test Home',
      summary: 'Test city',
      category: 'ST',
      photo: `${this.baseUrl}/r-architecture-GGupkreKwxA-unsplash.jpg`,
      frequency: 'daily',
      description: 'something newsie!',
    },
    {
      id: 8,
      name: 'Test Home',
      summary: 'Test city',
      category: 'ST',
      photo: `${this.baseUrl}/saru-robert-9rP3mxf8qWI-unsplash.jpg`,
      frequency: 'daily',
      description: 'something newsie!',
    },
    {
      id: 9,
      name: 'Test Home',
      summary: 'Test city',
      category: 'ST',
      photo: `${this.baseUrl}/webaliser-_TPTXZd9mOo-unsplash.jpg`,
      frequency: 'daily',
      description: 'something newsie!',
    }
  ];
}
