import { Component } from 'react';

import ItemList from '../items/item-list/item-list';

import LoadingSpinner from '../ui/loading-spinner/loading-spinner';

import type { ResultsSectionProps } from './results.types';

class ResultsSection extends Component<ResultsSectionProps> {
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

export default ResultsSection;
