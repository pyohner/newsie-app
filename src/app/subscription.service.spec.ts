// import { TestBed } from '@angular/core/testing';
//
// import { SubscriptionService } from './subscription.service';
//
// describe('SubscriptionService', () => {
//   let service: SubscriptionService;
//
//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//     service = TestBed.inject(SubscriptionService);
//   });
//
//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
// });

import { TestBed } from '@angular/core/testing';
import { SubscriptionService } from './subscription.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
//import { of } from 'rxjs';

describe('SubscriptionService', () => {
  let service: SubscriptionService;
  let httpMock: HttpTestingController;
  let fakeAuthService: any;

  beforeEach(() => {
    // Create a fake AuthService with a getUserId method
    fakeAuthService = {
      getUserId: jasmine.createSpy('getUserId').and.returnValue(null)
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        SubscriptionService,
        { provide: AuthService, useValue: fakeAuthService }
      ]
    });

    service = TestBed.inject(SubscriptionService);
    httpMock = TestBed.inject(HttpTestingController);
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getUserSubscriptions', () => {
    it('should return an empty list if no user is logged in (via AuthService)', () => {
      fakeAuthService.getUserId.and.returnValue(null);

      service.getUserSubscriptions().subscribe(subscriptions => {
        expect(subscriptions).toEqual([]);
      });
    });

    it('should return user subscriptions when a user is logged in', () => {
      // Set the fake user id to simulate a logged-in state
      fakeAuthService.getUserId.and.returnValue(1);
      const mockSubscriptions = [
        { userId: 1, newsletterId: 10 },
        { userId: 2, newsletterId: 20 },
        { userId: 1, newsletterId: 30 }
      ];

      service.getUserSubscriptions().subscribe(subscriptions => {
        // Should filter and return only subscriptions for userId 1
        expect(subscriptions).toEqual([10, 30]);
      });

      const req = httpMock.expectOne(`http://localhost:3333/api/subscriptions`);
      expect(req.request.method).toBe('GET');
      req.flush(mockSubscriptions);
    });

    it('should return an empty list on error', () => {
      fakeAuthService.getUserId.and.returnValue(1);

      service.getUserSubscriptions().subscribe(subscriptions => {
        expect(subscriptions).toEqual([]);
      });

      const req = httpMock.expectOne(`http://localhost:3333/api/subscriptions`);
      req.error(new ErrorEvent('Network error'));
    });
  });

  describe('isSubscribed', () => {
    beforeEach(() => {
      // For this test, we use the service's helper method which reads from localStorage.
      localStorage.setItem('user', JSON.stringify({ id: 1 }));
    });

    afterEach(() => {
      localStorage.clear();
    });

    it('should return true if the user is subscribed to the given newsletter', () => {
      const mockSubscriptions = [
        { userId: 1, newsletterId: 10 },
        { userId: 1, newsletterId: 20 }
      ];

      service.isSubscribed(10).subscribe(result => {
        expect(result).toBeTrue();
      });

      const req = httpMock.expectOne(`http://localhost:3333/api/subscriptions`);
      expect(req.request.method).toBe('GET');
      req.flush(mockSubscriptions);
    });

    it('should return false if the user is not subscribed to the given newsletter', () => {
      const mockSubscriptions = [
        { userId: 1, newsletterId: 20 },
        { userId: 2, newsletterId: 10 }
      ];

      service.isSubscribed(10).subscribe(result => {
        expect(result).toBeFalse();
      });

      const req = httpMock.expectOne(`http://localhost:3333/api/subscriptions`);
      expect(req.request.method).toBe('GET');
      req.flush(mockSubscriptions);
    });
  });

  describe('addSubscription', () => {
    it('should make a POST request to add a subscription', () => {
      const userId = 1;
      const newsletterId = 10;
      const mockResponse = { success: true };

      service.addSubscription(userId, newsletterId).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`http://localhost:3333/api/subscriptions`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ userId, newsletterId });
      req.flush(mockResponse);
    });
  });

  describe('removeSubscription', () => {
    it('should make a DELETE request to remove a subscription', () => {
      const userId = 1;
      const newsletterId = 10;
      const mockResponse = { success: true };

      service.removeSubscription(userId, newsletterId).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`http://localhost:3333/api/subscriptions`);
      expect(req.request.method).toBe('DELETE');
      // The request should include a body with userId and newsletterId
      expect(req.request.body).toEqual({ userId, newsletterId });
      req.flush(mockResponse);
    });
  });
});
