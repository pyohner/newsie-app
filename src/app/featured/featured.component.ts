import {Component, inject, Input} from '@angular/core';
import {Newsletter} from "../newsletter";
import {CommonModule} from "@angular/common";
import {NewsService} from "../news.service";
import {FeaturednewsletterComponent} from "../featurednewsletter/featurednewsletter.component";

@Component({
  selector: 'app-featured',
  standalone: true,
  imports: [
    CommonModule,
    FeaturednewsletterComponent
  ],
  template: `
    <section class="results">
      <app-featurednewsletter
        *ngFor="let newsletter of filteredNewsletterList"
        [newsletter]="newsletter">
      </app-featurednewsletter>
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
