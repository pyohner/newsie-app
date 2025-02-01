import {Component, Input} from '@angular/core';
import {Newsletter} from "../newsletter";
import {RouterLink, RouterOutlet} from "@angular/router";
import {AsyncPipe, NgIf} from "@angular/common";
import {AuthService} from "../auth.service";
import {SubscriptionService} from "../subscription.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-newsletter',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    AsyncPipe,
    NgIf
  ],
  template: `
    <section class="listing">
      <a [routerLink]="['/details', newsletter.id]">
        <img class="listing-photo" [src]="newsletter.photo" alt="Exterior photo of {{newsletter.name}}">
        <h2 class="listing-heading">{{ newsletter.name }}</h2>
      </a>
      <nav class="sub-bar">
        <div *ngIf="isLoggedIn | async">

          <a *ngIf="!(isSubscribed | async)"  class="sub-button">Subscribe</a>
          <a *ngIf="(isSubscribed | async)" class="unsub-button">Unsubscribe</a>

        </div>
      </nav>

    </section>
  `,
  styleUrl: './newsletter.component.css'
})
export class NewsletterComponent {
  userId: number | null = null;
  @Input() newsletterId!: number;
  @Input() newsletter!: Newsletter;

  isLoggedIn = this.authService.isLoggedIn$;
  isSubscribed!: Observable<boolean>;

  constructor(private authService: AuthService, private subscriptionService: SubscriptionService) {
  }

  ngOnInit(): void {
    this.userId = this.authService.getUserId(); // Retrieve user ID
    console.log("User ID:", this.userId);
    console.log("Newsletter ID:", this.newsletterId); // Check if it's defined

    if (this.userId !== null && this.newsletterId !== undefined) {
      this.isSubscribed = this.subscriptionService.isSubscribed(this.newsletterId);
    } else {
      console.warn("Missing userId or newsletterId");
    }
  }
}
