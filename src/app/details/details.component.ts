import { Component, inject } from '@angular/core';
import {AsyncPipe, CommonModule, Location, NgIf} from '@angular/common';
import {ActivatedRoute, RouterLinkActive} from '@angular/router';
import { NewsService} from "../news.service";
import { Newsletter} from "../newsletter";
import {AuthService} from "../auth.service";
import {Observable} from "rxjs";
import {SubscriptionService} from "../subscription.service";

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterLinkActive,
    AsyncPipe,
    NgIf
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

          <a *ngIf="!(isSubscribed | async)"  class="sub-button">Subscribe</a>
          <a *ngIf="(isSubscribed | async)" class="unsub-button">Unsubscribe</a>

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
  newsletterId: number | undefined;

  userId: number | null = null;
  isLoggedIn = this.authService.isLoggedIn$;
  isSubscribed!: Observable<boolean>;

  constructor(
    private location: Location,
    private authService: AuthService,
    private subscriptionService: SubscriptionService
  ) {
    const newsletterId = parseInt(this.route.snapshot.params['id'], 10);
    this.newsService.getNewsletterById(newsletterId).then(newsletter => {
      this.newsletter = newsletter;
      this.newsletterId = newsletterId;

      this.userId = this.authService.getUserId();
      console.log("User ID:", this.userId);
      console.log("Newsletter ID:", this.newsletterId);

      if (this.userId !== null && this.newsletterId !== undefined) {
        this.isSubscribed = this.subscriptionService.isSubscribed(this.newsletterId);
      } else {
        console.warn("Missing userId or newsletterId");
      }
    });
  }
  goBack(): void {
    this.location.back();
  }
}
