import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  // private userId: number | null = this.authService.getUserId(); // Store user ID

  private apiUrl = 'http://localhost:3000/subscriptions';

  constructor(private http: HttpClient, private authService: AuthService) {
    // this.userId = this.authService.getUserId();
  }

  isSubscribed(newsletterId: number): Observable<boolean> {
    const userId = this.authService.getUserId();
    if (userId === null) {
      console.log("No user logged in, returning false");
      return of(false);
    }

    console.log(`Checking subscription for userId: ${userId}, newsletterId: ${newsletterId}`);

    return this.http.get<any[]>(this.apiUrl).pipe(
      map(subscriptions => {
        console.log("Fetched subscriptions:", subscriptions);
        console.log("Checking subscription for userId:", userId, "newsletterId:", newsletterId);

        subscriptions.forEach(sub => {
          console.log(`Comparing sub.userId (${typeof sub.userId}): ${sub.userId} with userId (${typeof userId}): ${userId}`);
          console.log(`Comparing sub.newsletterId (${typeof sub.newsletterId}): ${sub.newsletterId} with newsletterId (${typeof newsletterId}): ${newsletterId}`);
        });

        const isSubscribed = subscriptions.some(sub => Number(sub.userId) === Number(userId) && Number(sub.newsletterId) === Number(newsletterId));

        console.log(`Subscription status: ${isSubscribed}`);
        return isSubscribed;
      }),
      catchError(error => {
        console.error("Error fetching subscriptions:", error);
        return of(false);
      })
    );
    // return this.http.get<any[]>(this.apiUrl).pipe(
    //   map(subscriptions =>
    //     subscriptions.some(sub => sub.userId === userId && sub.newsletterId === newsletterId)
    //   ),
    //   catchError(() => of(false))
    // );
  }
}
