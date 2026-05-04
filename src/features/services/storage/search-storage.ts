export const searchStorage = {
  save(term: string): void {
    if (term) {
      localStorage.setItem('searchTerm', term);
    }
  },

  get(): string | null {
    const savedTerm = localStorage.getItem('searchTerm');
    return savedTerm;
  },

  clear(): void {
    localStorage.removeItem('searchTerm');
  },
};
