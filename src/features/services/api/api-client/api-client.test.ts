import { HttpResponse, http } from 'msw';

import { describe, expect, it } from 'vitest';

import { ApiClient } from './api-client';

import { server } from '@/test/setup';

const apiClient = new ApiClient('https://swapi.dev/api');

describe('ApiClient', () => {
  describe('GET requests', () => {
    it('returns data on success', async () => {
      const mockData = { name: 'Luke' };

      server.use(
        http.get('https://swapi.dev/api/people/1', () => {
          return HttpResponse.json(mockData);
        })
      );

      const result = await apiClient.get('/people/1');

      expect(result).toEqual(mockData);
    });

    it('appends query parameters to URL', async () => {
      server.use(
        http.get('https://swapi.dev/api/people', ({ request }) => {
          const url = new URL(request.url);
          expect(url.searchParams.get('search')).toBe('luke');
          expect(url.searchParams.get('page')).toBe('1');
          return HttpResponse.json({});
        })
      );

      await apiClient.get('/people', { search: 'luke', page: '1' });
    });

    it('ignores parameters with empty string values', async () => {
      server.use(
        http.get('https://swapi.dev/api/people', ({ request }) => {
          const url = new URL(request.url);
          expect(url.searchParams.get('search')).toBeNull();
          expect(url.searchParams.get('empty')).toBeNull();
          expect(url.searchParams.get('page')).toBe('1');
          return HttpResponse.json({});
        })
      );

      await apiClient.get('/people', {
        search: '',
        page: '1',
        empty: '',
      });
    });

    it('throws error on 404', async () => {
      server.use(
        http.get('https://swapi.dev/api/unknown', () => {
          return new HttpResponse(null, {
            status: 404,
            statusText: 'Not Found',
          });
        })
      );

      await expect(apiClient.get('/unknown')).rejects.toThrow(
        'API Error: 404 Not Found'
      );
    });

    it('throws error on 500', async () => {
      server.use(
        http.get('https://swapi.dev/api/people', () => {
          return new HttpResponse(null, {
            status: 500,
            statusText: 'Internal Server Error',
          });
        })
      );

      await expect(apiClient.get('/people')).rejects.toThrow(
        'API Error: 500 Internal Server Error'
      );
    });

    it('handles URL encoding of special characters', async () => {
      server.use(
        http.get('https://swapi.dev/api/people', ({ request }) => {
          const url = new URL(request.url);
          expect(url.searchParams.get('search')).toBe('Darth Vader');
          return HttpResponse.json({});
        })
      );

      await apiClient.get('/people', { search: 'Darth Vader' });
    });
  });

  describe('POST requests', () => {
    it('sends data as JSON and returns response', async () => {
      const postData = { name: 'Yoda' };
      const mockResponse = { id: 1, name: 'Yoda' };

      server.use(
        http.post('https://swapi.dev/api/people', async ({ request }) => {
          const body = await request.json();
          expect(body).toEqual(postData);
          return HttpResponse.json(mockResponse);
        })
      );

      const result = await apiClient.post('/people', postData);

      expect(result).toEqual(mockResponse);
    });

    it('throws error on 400', async () => {
      server.use(
        http.post('https://swapi.dev/api/people', () => {
          return new HttpResponse(null, {
            status: 400,
            statusText: 'Bad Request',
          });
        })
      );

      await expect(apiClient.post('/people', {})).rejects.toThrow(
        'API Error: 400 Bad Request'
      );
    });

    it('throws error on 500', async () => {
      server.use(
        http.post('https://swapi.dev/api/people', () => {
          return new HttpResponse(null, {
            status: 500,
            statusText: 'Server Error',
          });
        })
      );

      await expect(apiClient.post('/people', {})).rejects.toThrow(
        'API Error: 500 Server Error'
      );
    });

    it('handles POST without data', async () => {
      server.use(
        http.post('https://swapi.dev/api/people', async ({ request }) => {
          const bodyText = await request.text();
          expect(bodyText).toBe('');
          return HttpResponse.json({ success: true });
        })
      );

      const result = await apiClient.post('/people');
      expect(result).toEqual({ success: true });
    });
  });
});
