import { HttpResponse, http } from 'msw';

import { describe, expect, it } from 'vitest';

import { itemsApi } from './items-api';

import { mockPerson } from '@/test/mocks/handler';

import { server } from '@/test/setup';

describe('itemsApi', () => {
  describe('getAll', () => {
    it('fetches all people successfully', async () => {
      const result = await itemsApi.getAll();

      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Luke Skywalker');
      expect(result[0].description).toContain('Height: 172cm');
    });

    it('handles empty response', async () => {
      server.use(
        http.get('https://swapi.dev/api/people', () => {
          return HttpResponse.json({ results: [] });
        })
      );

      const result = await itemsApi.getAll();

      expect(result).toHaveLength(0);
    });

    it('handles server error 500', async () => {
      server.use(
        http.get('https://swapi.dev/api/people', () => {
          return new HttpResponse(null, { status: 500 });
        })
      );

      await expect(itemsApi.getAll()).rejects.toThrow();
    });
  });

  describe('search', () => {
    it('searches people by term', async () => {
      const result = await itemsApi.search('luke');

      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Luke Skywalker');
    });

    it('returns empty array when no results', async () => {
      server.use(
        http.get('https://swapi.dev/api/people', ({ request }) => {
          const url = new URL(request.url);
          const search = url.searchParams.get('search');

          if (search !== 'luke') {
            return HttpResponse.json({ results: [] });
          }
          return HttpResponse.json({ results: [mockPerson] });
        })
      );

      const result = await itemsApi.search('unknown');
      expect(result).toHaveLength(0);
    });

    it('handles search with spaces (URL encoding)', async () => {
      server.use(
        http.get('https://swapi.dev/api/people', ({ request }) => {
          const url = new URL(request.url);
          const search = url.searchParams.get('search');

          expect(search).toBe('Darth Vader');
          return HttpResponse.json({ results: [] });
        })
      );

      await itemsApi.search('Darth Vader');
    });
  });

  describe('getById', () => {
    it('fetches person by id', async () => {
      const result = await itemsApi.getById('1');

      expect(result).not.toBeNull();
      expect(result?.name).toBe('Luke Skywalker');
    });

    it('returns null when person not found', async () => {
      const result = await itemsApi.getById('999');

      expect(result).toBeNull();
    });

    it('handles server error', async () => {
      server.use(
        http.get('https://swapi.dev/api/people/1', () => {
          return new HttpResponse(null, { status: 500 });
        })
      );

      const result = await itemsApi.getById('1');
      expect(result).toBeNull();
    });
  });

  describe('transformToItem', () => {
    it('transforms SwapiPerson to Item', () => {
      const item = itemsApi.transformToItem(mockPerson);

      expect(item).toEqual({
        id: '1',
        name: 'Luke Skywalker',
        description: expect.any(String),
      });
    });
  });

  describe('extractIdFromUrl', () => {
    it('extracts id from url', () => {
      expect(itemsApi.extractIdFromUrl('https://swapi.dev/api/people/1/')).toBe(
        '1'
      );
    });
  });

  describe('generateDescription', () => {
    it('generates description with all fields', () => {
      const description = itemsApi.generateDescription(mockPerson);

      expect(description).toContain('Height: 172cm');
      expect(description).toContain('Mass: 77kg');
      expect(description).toContain('Born: 19BBY');
    });

    it('returns default when no fields', () => {
      const emptyPerson = {
        name: 'n/a',
        height: 'n/a',
        mass: 'n/a',
        hair_color: 'n/a',
        skin_color: 'n/a',
        eye_color: 'n/a',
        birth_year: 'n/a',
        gender: 'n/a',
        url: 'https://swapi.dev/api/people/1/',
      };
      expect(itemsApi.generateDescription(emptyPerson)).toBe(
        'No description available'
      );
    });
  });
});
