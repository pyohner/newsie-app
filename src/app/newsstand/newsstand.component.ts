import { Component } from '@angular/core';

@Component({
  selector: 'app-newsstand',
  standalone: true,
  imports: [],
  template: `
    <section>
      <form>
        <input type="text" placeholder="Filter by summary">
        <button class="primary" type="button">Search</button>
      </form>
    </section>
  `,
  styleUrl: './newsstand.component.css'
})
export class NewsstandComponent {

}
