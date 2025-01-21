import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { NewsService} from "../news.service";
import { Newsletter} from "../newsletter";

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  template: `
    <article>
      <img class="listing-photo" [src]="newsletter?.photo"
           alt="Image of {{newsletter?.name}}"/>
      <section class="listing-description">
        <h2 class="listing-heading">{{newsletter?.name}}</h2>
        <p class="listing-location">{{newsletter?.summary}}, {{newsletter?.category}}</p>
      </section>
      <section class="listing-features">
        <h2 class="section-heading">About this newsletter</h2>
        <ul>
          <li>Frequency: {{newsletter?.frequency}}</li>
          <li>Description: {{newsletter?.description}}</li>
        </ul>
      </section>
    </article>
  `,
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  newsService = inject(NewsService);
  newsletter: Newsletter | undefined;

  constructor() {
    const newsletterId = Number(this.route.snapshot.params['id']);
    this.newsletter = this.newsService.getNewsletterById(newsletterId);
  }
}
