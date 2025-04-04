// import { TestBed } from '@angular/core/testing';
//
// import { AuthService } from './auth.service';
//
// describe('AuthService', () => {
//   let service: AuthService;
//
//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//     service = TestBed.inject(AuthService);
//   });
//
//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
// });
import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    // Clear localStorage before each test to avoid state bleed
    localStorage.clear();

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login', () => {
    it('should return true and store user when response is valid', () => {
      const email = 'test@example.com';
      const password = 'password';
      const mockResponse = { user: { id: 1, email } };

      service.login(email, password).subscribe(result => {
        expect(result).toBeTrue();
        // Verify that the user has been stored in localStorage
        const storedUser = localStorage.getItem('user');
        expect(storedUser).toBeTruthy();
        expect(JSON.parse(storedUser as string).id).toBe(1);
      });

      const req = httpMock.expectOne(`${service['apiUrl']}/login`);
      expect(req.request.method).toBe('POST');
      req.flush(mockResponse);
    });

    it('should return false when response does not contain a user', () => {
      const email = 'test@example.com';
      const password = 'wrongpassword';
      const mockResponse = {}; // Missing the 'user' key

      service.login(email, password).subscribe(result => {
        expect(result).toBeFalse();
        expect(localStorage.getItem('user')).toBeNull();
      });

      const req = httpMock.expectOne(`${service['apiUrl']}/login`);
      expect(req.request.method).toBe('POST');
      req.flush(mockResponse);
    });

    it('should return false when there is a network error', () => {
      const email = 'test@example.com';
      const password = 'password';

      service.login(email, password).subscribe(result => {
        expect(result).toBeFalse();
      });

      const req = httpMock.expectOne(`${service['apiUrl']}/login`);
      expect(req.request.method).toBe('POST');
      req.error(new ErrorEvent('Network error'));
    });
  });

  describe('logout', () => {
    it('should clear localStorage and update isLoggedIn$', () => {
      // Simulate a logged-in state by setting a user in localStorage
      localStorage.setItem('user', JSON.stringify({ id: 1, email: 'test@example.com' }));
      service.logout();
      expect(localStorage.getItem('user')).toBeNull();

      // Check that the authentication observable reflects the logged-out state
      service.isLoggedIn$.subscribe(isLoggedIn => {
        expect(isLoggedIn).toBeFalse();
      });
    });
  });

  describe('getUserId', () => {
    it('should return the user id from localStorage', () => {
      const user = { id: 42, email: 'user@example.com' };
      localStorage.setItem('user', JSON.stringify(user));
      expect(service.getUserId()).toBe(42);
    });

    it('should return null when no user is stored', () => {
      localStorage.removeItem('user');
      expect(service.getUserId()).toBeNull();
    });
  });

  describe('register', () => {
    it('should return true when registration is successful', () => {
      const username = 'newuser';
      const email = 'newuser@example.com';
      const password = 'password';
      const mockResponse = { id: 1, username, email };

      service.register(username, email, password).subscribe(result => {
        expect(result).toBeTrue();
      });

      const req = httpMock.expectOne(`${service['apiUrl']}/users`);
      expect(req.request.method).toBe('POST');
      req.flush(mockResponse);
    });

    it('should return false when registration fails', () => {
      const username = 'newuser';
      const email = 'newuser@example.com';
      const password = 'password';
      const mockResponse = {}; // No 'id' in response

      service.register(username, email, password).subscribe(result => {
        expect(result).toBeFalse();
      });

      const req = httpMock.expectOne(`${service['apiUrl']}/users`);
      expect(req.request.method).toBe('POST');
      req.flush(mockResponse);
    });

    it('should return false when there is a registration error', () => {
      const username = 'newuser';
      const email = 'newuser@example.com';
      const password = 'password';

      service.register(username, email, password).subscribe(result => {
        expect(result).toBeFalse();
      });

      const req = httpMock.expectOne(`${service['apiUrl']}/users`);
      expect(req.request.method).toBe('POST');
      req.error(new ErrorEvent('Network error'));
    });
  });
});
