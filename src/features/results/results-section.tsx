import { ItemList } from '@features/items';

import { LoadingSpinner } from '@features/ui';

import { Component } from 'react';

import type { ResultsSectionProps } from './results.types';

export class ResultsSection extends Component<ResultsSectionProps> {
  render() {
    const { items, loading, error } = this.props;

    return (
      <div className="mt-8">
        <h2 className="mb-4 text-center text-2xl font-bold text-gray-800">
          Results
        </h2>

        {loading && <LoadingSpinner />}

        {error && (
          <div className="rounded-lg bg-red-50 p-4 text-red-600">
            Error: {error}
          </div>
        )}

        {!loading && !error && <ItemList items={items} />}
      </div>
    );
  }
}
