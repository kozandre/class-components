import apiClient from '../api-client/api-client';

import type { SwapiPerson, SwapiResponse } from '../api.types';

import type { Item } from '@items/item.types';

export const itemsApi = {
  async getAll(): Promise<Item[]> {
    const data = await apiClient.get<SwapiResponse>('/people');
    return data.results.map((person) => itemsApi.transformToItem(person));
  },

  async search(term: string): Promise<Item[]> {
    const url = `/people/?search=${term}`;
    const data = await apiClient.get<SwapiResponse>(url);
    return data.results.map((person) => itemsApi.transformToItem(person));
  },

  async getById(id: string): Promise<Item | null> {
    try {
      const person = await apiClient.get<SwapiPerson>(`/people/${id}/`);
      return this.transformToItem(person);
    } catch {
      return null;
    }
  },
  transformToItem(person: SwapiPerson): Item {
    return {
      id: this.extractIdFromUrl(person.url),
      name: person.name,
      description: this.generateDescription(person),
    };
  },

  extractIdFromUrl(url: string): string {
    const parts = url.split('/');
    return parts.filter(Boolean).pop() || '';
  },

  generateDescription(person: SwapiPerson): string {
    const details = [];
    if (person.height && person.height !== 'n/a') {
      details.push(`Height: ${person.height}cm`);
    }
    if (person.mass && person.mass !== 'n/a') {
      details.push(`Mass: ${person.mass}kg`);
    }
    if (person.birth_year && person.birth_year !== 'n/a') {
      details.push(`Born: ${person.birth_year}`);
    }
    if (person.hair_color && person.hair_color !== 'n/a') {
      details.push(`Hair Color: ${person.hair_color}`);
    }
    if (person.skin_color && person.skin_color !== 'n/a') {
      details.push(`Skin Color: ${person.skin_color}`);
    }
    if (person.eye_color && person.eye_color !== 'n/a') {
      details.push(`Eye Color: ${person.eye_color}`);
    }
    return details.join('; ') || 'No description available';
  },

  formatDescription(person: SwapiPerson): string {
    return this.generateDescription(person);
  },
};
