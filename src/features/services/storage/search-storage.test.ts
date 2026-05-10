import { describe, expect, it } from 'vitest';

import { searchStorage } from './search-storage';

describe('searchStorage', () => {
  it('saves term to localStorage', () => {
    searchStorage.save('Luke');
    expect(localStorage.getItem('searchTerm')).toBe('Luke');
  });

  it('retrieves saved term', () => {
    localStorage.setItem('searchTerm', 'Darth Vader');
    expect(searchStorage.get()).toBe('Darth Vader');
  });

  it('returns null when no term saved', () => {
    expect(searchStorage.get()).toBeNull();
  });

  it('clears search term', () => {
    searchStorage.save('Yoda');
    searchStorage.clear();
    expect(searchStorage.get()).toBeNull();
  });

  it('does not save empty string', () => {
    searchStorage.save('');
    expect(searchStorage.get()).toBeNull();
  });
});
