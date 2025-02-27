import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  // private apiUrl = 'http://localhost:3000/subscriptions';
  private apiUrl = 'http://localhost:3333/api/subscriptions';

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  // isSubscribed(newsletterId: number): Observable<boolean> {
  //   const userId = this.authService.getUserId();
  //   if (userId === null) {
  //     console.log("No user logged in, returning false");
  //     return of(false);
  //   }
  //
  //   console.log(`Checking subscription for userId: ${userId}, newsletterId: ${newsletterId}`);
  //
  //   return this.http.get<any[]>(this.apiUrl).pipe(
  //     map(subscriptions => {
  //       console.log("Fetched subscriptions:", subscriptions);
  //       console.log("Checking subscription for userId:", userId, "newsletterId:", newsletterId);
  //
  //       subscriptions.forEach(sub => {
  //         console.log(`Comparing sub.userId (${typeof sub.userId}): ${sub.userId} with userId (${typeof userId}): ${userId}`);
  //         console.log(`Comparing sub.newsletterId (${typeof sub.newsletterId}): ${sub.newsletterId} with newsletterId (${typeof newsletterId}): ${newsletterId}`);
  //       });
  //
  //       const isSubscribed = subscriptions.some(sub => Number(sub.userId) === Number(userId) && Number(sub.newsletterId) === Number(newsletterId));
  //
  //       console.log(`Subscription status: ${isSubscribed}`);
  //       return isSubscribed;
  //     }),
  //     catchError(error => {
  //       console.error("Error fetching subscriptions:", error);
  //       return of(false);
  //     })
  //   );
  // }

  getUserSubscriptions(): Observable<number[]> {
    const userId = this.authService.getUserId();
    if (userId === null) {
      console.log("No user logged in, returning empty list");
      return of([]);
    }

    console.log(`Fetching subscriptions for userId: ${userId}`);

    return this.http.get<any[]>(this.apiUrl).pipe(
      map(subscriptions => {
        console.log("Fetched subscriptions:", subscriptions);

        const userSubscriptions = subscriptions
          .filter(sub => Number(sub.userId) === Number(userId))
          .map(sub => Number(sub.newsletterId));

        console.log(`User subscriptions:`, userSubscriptions);
        return userSubscriptions;
      }),
      catchError(error => {
        console.error("Error fetching user subscriptions:", error);
        return of([]);
      })
    );
  }

  /** Fetch all subscriptions */
  getSubscriptions(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  /** Check if user is subscribed */
  isSubscribed(newsletterId: number | undefined): Observable<boolean> {
    const userId = this.getUserId();
    return this.getSubscriptions().pipe(
      map(subscriptions => subscriptions.some(sub => sub.userId === userId && sub.newsletterId === newsletterId))
    );
  }

  /** Helper to get logged-in user ID */
  getUserId(): number | null {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user?.id || null;
  }

  /** Add a subscription */
  addSubscription(userId: number, newsletterId: number): Observable<any> {
    return this.http.post(this.apiUrl, { userId, newsletterId });
  }

  /** Remove a subscription */
  removeSubscription(userId: number, newsletterId: number): Observable<any> {
    return this.http.request('DELETE', this.apiUrl, { body: { userId, newsletterId } });
  }


}
