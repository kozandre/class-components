import { HttpResponse, http } from 'msw';

import type { SwapiPerson } from '@services/api/api.types';

export const mockPerson: SwapiPerson = {
  name: 'Luke Skywalker',
  height: '172',
  mass: '77',
  hair_color: 'blond',
  skin_color: 'fair',
  eye_color: 'blue',
  birth_year: '19BBY',
  gender: 'male',
  url: 'https://swapi.dev/api/people/1/',
};

export const handlers = [
  http.get('https://swapi.dev/api/people', () => {
    return HttpResponse.json({ results: [mockPerson] });
  }),

  http.get('https://swapi.dev/api/people/1/', () => {
    return HttpResponse.json(mockPerson);
  }),

  http.get('https://swapi.dev/api/people/999/', () => {
    return new HttpResponse(null, { status: 404 });
  }),

  http.get('https://swapi.dev/api/people/error/', () => {
    return new HttpResponse(null, { status: 500 });
  }),
];
