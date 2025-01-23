import {Component, inject, Input} from '@angular/core';
import {Newsletter} from "../newsletter";
import { NewsletterComponent} from "../newsletter/newsletter.component";
import {CommonModule} from "@angular/common";
import {NewsService} from "../news.service";



@Component({
  selector: 'app-featured',
  standalone: true,
  imports: [
    CommonModule,
    NewsletterComponent
  ],
  template: `
    <section class="results">
      <app-newsletter
        *ngFor="let newsletter of filteredNewsletterList"
        [newsletter]="newsletter">
      </app-newsletter>
    </section>
  `,
  styleUrl: './featured.component.css'
})
export class FeaturedComponent {
  @Input() newsletter!: Newsletter;

  newsletterList: Newsletter[] = [];
  newsService: NewsService = inject(NewsService);
  filteredNewsletterList: Newsletter[] = [];
  constructor() {
    this.newsService.getAllNewsletters().then((newsletterList: Newsletter[]) => {
      this.newsletterList = newsletterList;
      this.filteredNewsletterList = newsletterList;
    });
  }
  ngOnInit() {
    this.newsService.getAllNewsletters().then((newsletterList: Newsletter[]) => {
      this.newsletterList = newsletterList;
      this.filteredNewsletterList = this.newsletterList.filter(newsletter => newsletter.featured);
    });
  }
}
