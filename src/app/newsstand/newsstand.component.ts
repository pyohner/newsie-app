import { Component, inject } from '@angular/core';
import { NewsletterComponent} from "../newsletter/newsletter.component";
import {CommonModule} from "@angular/common";
import {Newsletter} from "../newsletter";
import {NewsService} from "../news.service";

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

  newsletterList: Newsletter[] = [];
  newsService: NewsService = inject(NewsService);

  constructor() {
    this.newsletterList = this.newsService.getAllNewsletters();
  }

}
