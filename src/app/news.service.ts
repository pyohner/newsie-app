import { Injectable } from '@angular/core';
import {Newsletter} from "./newsletter";

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  url = 'http://localhost:3000/newsletters';

  async getAllNewsletters(): Promise<Newsletter[]> {
    const data = await fetch(this.url);
    return await data.json() ?? [];
  }

  async getNewsletterById(id: number): Promise<Newsletter | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    return await data.json() ?? {};
  }
  submitForm(firstName: string, lastName: string, email: string) {
    console.log(`Contact Us: firstName: ${firstName}, lastName: ${lastName}, email: ${email}.`);
  }
}
