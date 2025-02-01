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

    <div>
      <h1 class="title">The Newsstand</h1>

      <div class="container">
        <!-- Left Sidebar for category filter -->
        <div class="filter-panel">
          <p>Categories</p>
          <div *ngFor="let category of categories">
            <label>
              <input
                type="checkbox"
                [value]="category"
                (change)="onCategoryChange($event)"
              />
              {{ category }}
            </label>
          </div>
        </div>

        <div class="main-content">
      <div class="search">
      <form>
        <input type="text" placeholder="Search titles" #filter>
        <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>
      </form>
    </div>
    <div class="results">
      <app-newsletter
        *ngFor="let newsletter of filteredNewsletterList"
        [newsletterId]="newsletter.id"
        [newsletter]="newsletter">
      </app-newsletter>
    </div>
    </div>
      </div>
    </div>
  `,
  styleUrl: './newsstand.component.css'
})
export class NewsstandComponent {
  readonly baseUrl = 'https://angular.io/assets/images/tutorials/faa';

  newsletterList: Newsletter[] = [];
  newsService: NewsService = inject(NewsService);
  filteredNewsletterList: Newsletter[] = [];
  categories: string[] = [];
  selectedCategories: string[] = [];

  constructor() {
    this.newsService.getAllNewsletters().then((newsletterList: Newsletter[]) => {
      this.newsletterList = newsletterList;
      this.filteredNewsletterList = newsletterList;

      const allCategories = newsletterList.map((newsletter) => newsletter.category);
      this.categories = Array.from(new Set(allCategories)); // Get unique categories
    });
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredNewsletterList = this.newsletterList;
      return;
    }

    this.filteredNewsletterList = this.newsletterList.filter(
      newsletter => newsletter?.name.toLowerCase().includes(text.toLowerCase())
    );
  }

  filterByCategories(text: string) {
    if (this.selectedCategories.length === 0) {
      this.filteredNewsletterList = this.newsletterList;
    } else {
      this.filteredNewsletterList = this.newsletterList.filter((newsletter) =>
        this.selectedCategories.includes(newsletter.category)
      );
    }
  }
// Handle category selection
  onCategoryChange(event: any): void {
    const category = event.target.value;

    if (event.target.checked) {
      this.selectedCategories.push(category); // Add category to selected
    } else {
      const index = this.selectedCategories.indexOf(category);
      if (index > -1) {
        this.selectedCategories.splice(index, 1); // Remove category if unchecked
      }
    }

    this.filterByCategories(category); // Reapply filter when selection changes
  }
}
