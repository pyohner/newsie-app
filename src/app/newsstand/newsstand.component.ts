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
        <input type="text" placeholder="Filter by summary" #filter>
        <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>
      </form>
    </section>
    <section class="results">
      <app-newsletter
        *ngFor="let newsletter of filteredNewsletterList"
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
  filteredNewsletterList: Newsletter[] = [];

  constructor() {
    this.newsletterList = this.newsService.getAllNewsletters();
    this.filteredNewsletterList = this.newsletterList;
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredNewsletterList = this.newsletterList;
      return;
    }

    this.filteredNewsletterList = this.newsletterList.filter(
      newsletter => newsletter?.summary.toLowerCase().includes(text.toLowerCase())
    );
  }

}
