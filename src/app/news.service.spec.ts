import { TestBed } from '@angular/core/testing';
import { NewsService } from './news.service';
import { Newsletter } from './newsletter';

describe('NewsService', () => {
  let service: NewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NewsService]
    });
    service = TestBed.inject(NewsService);
  });

  describe('getAllNewsletters', () => {
    it('should return a list of newsletters when fetch resolves successfully', async () => {
      const mockNewsletters: Newsletter[] = [
        {
          id: 1,
          name: 'Newsletter One',
          summary: 'Summary 1',
          category: 'Tech',
          photo: 'photo1.jpg',
          frequency: 'Weekly',
          description: 'Description 1',
          featured: true
        },
        {
          id: 2,
          name: 'Newsletter Two',
          summary: 'Summary 2',
          category: 'Health',
          photo: 'photo2.jpg',
          frequency: 'Monthly',
          description: 'Description 2',
          featured: false
        }
      ];
      spyOn(window, 'fetch').and.returnValue(Promise.resolve({
        json: () => Promise.resolve(mockNewsletters)
      } as any));

      const newsletters = await service.getAllNewsletters();
      expect(newsletters).toEqual(mockNewsletters);
      expect(window.fetch).toHaveBeenCalledWith(service.url);
    });

    it('should return an empty array if fetch returns null', async () => {
      spyOn(window, 'fetch').and.returnValue(Promise.resolve({
        json: () => Promise.resolve(null)
      } as any));

      const newsletters = await service.getAllNewsletters();
      expect(newsletters).toEqual([]);
    });
  });

  describe('getNewsletterById', () => {
    it('should return a newsletter when fetch resolves successfully', async () => {
      const newsletterId = 1;
      const mockNewsletter: Newsletter = {
        id: newsletterId,
        name: 'Newsletter One',
        summary: 'Summary 1',
        category: 'Tech',
        photo: 'photo1.jpg',
        frequency: 'Weekly',
        description: 'Description 1',
        featured: true
      };
      spyOn(window, 'fetch').and.returnValue(Promise.resolve({
        json: () => Promise.resolve(mockNewsletter)
      } as any));

      const newsletter = await service.getNewsletterById(newsletterId);
      expect(newsletter).toEqual(mockNewsletter);
      expect(window.fetch).toHaveBeenCalledWith(`${service.url}/${newsletterId}`);
    });

    it('should return undefined if fetch returns null', async () => {
      spyOn(window, 'fetch').and.returnValue(Promise.resolve({
        json: () => Promise.resolve(null)
      } as any));

      const newsletter = await service.getNewsletterById(5);
      expect(newsletter).toBeUndefined();
    });
  });

  describe('submitForm', () => {
    it('should log the correct message to the console', () => {
      spyOn(console as any, 'log');
      const firstName = 'John';
      const lastName = 'Doe';
      const email = 'john.doe@example.com';

      service.submitForm(firstName, lastName, email);
      expect(console.log).toHaveBeenCalledWith(
        `Contact Us: firstName: ${firstName}, lastName: ${lastName}, email: ${email}.`
      );
    });
  });
});
