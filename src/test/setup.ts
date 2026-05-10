import '@testing-library/jest-dom/vitest';

import { cleanup } from '@testing-library/react';

import { setupServer } from 'msw/node';

import { afterAll, afterEach, beforeAll, vi } from 'vitest';

import { handlers } from './mocks/handler';

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
  localStorage.clear();
});

export const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
