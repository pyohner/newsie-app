import { Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import {ActivatedRoute, RouterLinkActive} from '@angular/router';
import { NewsService} from "../news.service";
import { Newsletter} from "../newsletter";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterLinkActive,
  ],
  template: `
    <main>
      <h1 class="title">The Newsstand</h1>
      <a (click)="goBack()" class="back-link">Back</a>

      <section class="listing">
        <img class="listing-photo" [src]="newsletter?.photo"
           alt="Image of {{newsletter?.name}}"/>
      <div class="listing-content">
        <h2 class="listing-heading">{{ newsletter?.name }}</h2>
        <p class="listing-info">{{ newsletter?.description }}</p>

        <nav class="sub-bar">
        <div *ngIf="isLoggedIn | async">

          <a class="sub-button">Subscribe</a>
          <a class="sub-button">Unsubscribe</a>

        </div>
        </nav>
      </div>
      </section>
    </main>
  `,
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  newsService = inject(NewsService);
  newsletter: Newsletter | undefined;

  isLoggedIn = this.authService.isLoggedIn$;

  constructor(private location: Location, private authService: AuthService) {
    const newsletterId = parseInt(this.route.snapshot.params['id'], 10);
    this.newsService.getNewsletterById(newsletterId).then(newsletter => {
      this.newsletter = newsletter;
    });
  }
  goBack(): void {
    this.location.back(); // Navigates to the previous page
  }

}
