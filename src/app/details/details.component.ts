import { Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { NewsService} from "../news.service";
import { Newsletter} from "../newsletter";
// import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    CommonModule,
    // ReactiveFormsModule
  ],
  template: `
    <main>
      <h1 class="title">The Newsstand</h1>
      <a (click)="goBack()" class="back-link">← Back</a>

      <section class="listing">
        <img class="listing-photo" [src]="newsletter?.photo"
           alt="Image of {{newsletter?.name}}"/>
      <div class="listing-content">
        <h2 class="listing-heading">{{ newsletter?.name }}</h2>
        <p class="listing-info">{{ newsletter?.description }}</p>
<!--        <h2 class="section-heading">About this newsletter</h2>-->
<!--        <ul class="listing-info">-->
<!--          <li>Category: {{ newsletter?.category }}</li>-->
<!--          <li>Frequency: {{ newsletter?.frequency }}</li>-->
<!--          <li>Description: {{ newsletter?.description }}</li>-->
<!--        </ul>-->
      </div>
      </section>
    </main>
<!--      <section class="listing-ask">-->
<!--        <h2 class="section-heading">Ask us about it.</h2>-->
<!--        <form [formGroup]="askForm" (submit)="submitForm()">-->
<!--          <label for="first-name">First Name</label>-->
<!--          <input id="first-name" type="text" formControlName="firstName">-->

<!--          <label for="last-name">Last Name</label>-->
<!--          <input id="last-name" type="text" formControlName="lastName">-->

<!--          <label for="email">Email</label>-->
<!--          <input id="email" type="email" formControlName="email">-->
<!--          <button type="submit" class="primary">Apply now</button>-->
<!--        </form>-->
<!--      </section>-->
  `,
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  newsService = inject(NewsService);
  newsletter: Newsletter | undefined;

  // askForm = new FormGroup({
  //   firstName: new FormControl(''),
  //   lastName: new FormControl(''),
  //   email: new FormControl('')
  // });
  constructor(private location: Location) {
    const newsletterId = parseInt(this.route.snapshot.params['id'], 10);
    this.newsService.getNewsletterById(newsletterId).then(newsletter => {
      this.newsletter = newsletter;
    });
  }
  goBack(): void {
    this.location.back(); // Navigates to the previous page
  }

  // submitForm() {
    //   this.newsService.submitForm(
    //     this.askForm.value.firstName ?? '',
    //     this.askForm.value.lastName ?? '',
    //     this.askForm.value.email ?? ''
    //   );
    // }
}
