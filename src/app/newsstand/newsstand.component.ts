import { Component, inject } from '@angular/core';
import { NewsletterComponent} from "../newsletter/newsletter.component";
import {CommonModule} from "@angular/common";
import {Newsletter} from "../newsletter";
import {NewsService} from "../news.service";
import {SubscriptionService} from "../subscription.service";
import {AuthService} from "../auth.service";


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

          <br>

          <div *ngIf="isLoggedIn | async">
            <label>
              <input type="radio" name="subscriptionFilter" value="all"
                     [checked]="subscriptionFilter === 'all'"
                     (change)="onSubscriptionFilterChange('all')">
              All
            </label>

            <label>
              <input type="radio" name="subscriptionFilter" value="subscribed"
                     [checked]="subscriptionFilter === 'subscribed'"
                     (change)="onSubscriptionFilterChange('subscribed')">
              Subscribed
            </label>

            <label>
              <input type="radio" name="subscriptionFilter" value="unsubscribed"
                     [checked]="subscriptionFilter === 'unsubscribed'"
                     (change)="onSubscriptionFilterChange('unsubscribed')">
              Unsubscribed
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
        *ngFor="let newsletter of paginatedNewsletterList"
        [newsletterId]="newsletter.id"
        [newsletter]="newsletter">
      </app-newsletter>
    </div>
          <div class="pagination">
            <button (click)="prevPage()" [disabled]="currentPage === 1">Previous</button>
            <span>Page {{ currentPage }} of {{ totalPages }}</span>
            <button (click)="nextPage()" [disabled]="currentPage === totalPages">Next</button>
          </div>
    </div>
      </div>
    </div>
  `,
  styleUrl: './newsstand.component.css'
})
export class NewsstandComponent {
  readonly baseUrl = 'https://angular.io/assets/images/tutorials/faa';

  isLoggedIn = this.authService.isLoggedIn$;

  newsletterList: Newsletter[] = [];
  newsService: NewsService = inject(NewsService);

  subscriptionService: SubscriptionService = inject(SubscriptionService);


  originalNewsletterList: Newsletter[] = [];
  filteredNewsletterList: Newsletter[] = [];
  paginatedNewsletterList: Newsletter[] = [];

  categories: string[] = [];
  selectedCategories: string[] = [];

  subscribedNewsletterIds: number[] = [];
  showSubscribedOnly: boolean = false;

  currentPage: number = 1;
  resultsPerPage: number = 6;
  totalPages: number = 1;

  subscriptionFilter: 'all' | 'subscribed' | 'unsubscribed' = 'all'; // Default to 'All'

  constructor(private authService: AuthService) {
    this.newsService.getAllNewsletters().then((newsletterList: Newsletter[]) => {
      this.newsletterList = newsletterList;
      this.originalNewsletterList = [...newsletterList];
      this.filteredNewsletterList = [...newsletterList];

      const allCategories = newsletterList.map((newsletter) => newsletter.category);
      this.categories = Array.from(new Set(allCategories));

      this.calculateTotalPages();
      this.paginateResults();

      this.loadUserSubscriptions();

    });

  }

  loadUserSubscriptions() {
    this.subscriptionService.getUserSubscriptions().subscribe((subscriptions: number[]) => {
      this.subscribedNewsletterIds = subscriptions.map(id => Number(id)); // Ensure IDs are numbers
      console.log('Loaded Subscriptions:', this.subscribedNewsletterIds); // Debugging
      this.applyFilters(); // Apply filters only after subscriptions are loaded
    });
  }

  filterResults(text: string) {
    let filteredList = this.originalNewsletterList;

    if (text) {
      filteredList = filteredList.filter(newsletter =>
        newsletter?.name.toLowerCase().includes(text.toLowerCase())
      );
    }

    this.filteredNewsletterList = this.filterByCategories(filteredList);
    this.filteredNewsletterList = this.filterBySubscription(this.filteredNewsletterList);


    this.calculateTotalPages();
    this.paginateResults();

  }

  filterByCategories(newsletterList: Newsletter[]) {
    if (this.selectedCategories.length === 0) {
      return newsletterList;
    }

    return newsletterList.filter((newsletter) =>
      this.selectedCategories.includes(newsletter.category)
    );
  }

  filterBySubscription(newsletterList: Newsletter[]): Newsletter[] {
    if (this.subscriptionFilter === 'all') {
      return newsletterList;
    }

    return newsletterList.filter(newsletter => {
      const newsletterId = Number(newsletter.id); // Ensure ID is a number

      return this.subscriptionFilter === 'subscribed'
        ? this.subscribedNewsletterIds.includes(newsletterId)
        : !this.subscribedNewsletterIds.includes(newsletterId);
    });
  }

  // filterBySubscription(newsletterList: Newsletter[]) {
  //   if (!this.showSubscribedOnly) {
  //     return newsletterList;
  //   }
  //
  //   // Debugging: Log values to check if IDs match
  //   console.log('Filtering by subscription. Subscribed IDs:', this.subscribedNewsletterIds);
  //   console.log('Newsletter IDs:', newsletterList.map(n => n.id));
  //
  //   return newsletterList.filter(newsletter =>
  //     this.subscriptionFilter === 'subscribed'
  //       ? this.subscribedNewsletterIds.includes(Number(newsletter.id))
  //       : !this.subscribedNewsletterIds.includes(Number(newsletter.id))
  //   );
  // }

  // toggleSubscriptionFilter() {
  //   this.showSubscribedOnly = !this.showSubscribedOnly;
  //   this.applyFilters();
  // }
  onSubscriptionFilterChange(value: 'all' | 'subscribed' | 'unsubscribed') {
    this.subscriptionFilter = value;
    this.filterResults(''); // Force re-filtering with an empty search string
  }


  onCategoryChange(event: any): void {

    const category = event.target.value;

    if (event.target.checked) {
      this.selectedCategories.push(category);
    } else {
      const index = this.selectedCategories.indexOf(category);
      if (index > -1) {
        this.selectedCategories.splice(index, 1);
      }
    }

    this.applyFilters();
  }

  applyFilters() {
    const searchText = (document.querySelector('input[type="text"]') as HTMLInputElement)?.value || '';
    this.filterResults(searchText);
  }

  calculateTotalPages() {
    this.totalPages = Math.ceil(this.filteredNewsletterList.length / this.resultsPerPage);
  }

  paginateResults() {
    const startIndex = (this.currentPage - 1) * this.resultsPerPage;
    const endIndex = startIndex + this.resultsPerPage;

    this.paginatedNewsletterList = this.filteredNewsletterList.slice(startIndex, endIndex);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginateResults();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateResults();
    }
  }

  // Go to a specific page - Not implemented
  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.paginateResults();
    }
  }

}
