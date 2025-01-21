import { Component, Input } from '@angular/core';
import { CommonModule } from "@angular/common";
import {Newsletter} from "../newsletter";

@Component({
  selector: 'app-newsletter',
  standalone: true,
  imports: [],
  template: `
    <p>
      newsletter works!
    </p>
  `,
  styleUrl: './newsletter.component.css'
})
export class NewsletterComponent {
  @Input() newsletter!: Newsletter;
}
