import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  template: `
    <main>
    <h1>About Newsie</h1>
    <p>
      Welcome to <b>Newsie</b>, your personalized newsletter subscription platform!
    </p>
    <p>
      At <b>Newsie</b>, we believe staying informed should be simple, convenient, and tailored to your interests. That’s why we’ve created a space where you can explore, subscribe to, and receive curated newsletters delivered straight to your inbox.
    </p>
    <p>
      With <b>Newsie</b>, you can:
    </p>
      <ul>
        <li>
          <b>Discover Diverse Topics:</b> From politics and world news to sports, gardening, and technology, we offer a wide range of newsletters to suit every interest.
        </li>
        <li>
          <b>Stay Informed with Curated Content:</b> Each newsletter is carefully crafted to bring you the latest news and insights, with a curated list of trusted links and helpful descriptions to guide your reading.
        </li>
        <li>
          <b>Enjoy Effortless Updates:</b> Subscribe to your favorite topics and let us do the rest. Your newsletters will be delivered directly to your email, keeping you informed without the hassle.
        </li>
      </ul>
    <p>
      Whether you’re a news junkie, a casual reader, or someone looking to dive deeper into a specific topic, <b>Newsie</b> is here to help you stay connected and informed in a way that fits your lifestyle.
    </p>
    <p>
      <b>Newsie</b>—It’s all you need to know.
    </p>
    </main>
  `,
  styleUrl: './about.component.css'
})
export class AboutComponent {

}
