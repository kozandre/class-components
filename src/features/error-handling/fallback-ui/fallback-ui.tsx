import { Component } from 'react';

import type { FallbackUIProps } from '../error-handling.types';

class FallbackUI extends Component<FallbackUIProps> {
  handleResetClick = () => {
    this.props.resetError?.();
  };

  render() {
    const { error, resetError } = this.props;

    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="max-w-md rounded-lg bg-red-50 p-8 text-center shadow-lg">
          <h2 className="mb-2 text-2xl font-bold text-red-800">
            Application Error
          </h2>
          <p className="mb-4 text-red-600">
            {error?.message ||
              'An unexpected error occurred in the application'}
          </p>
          {resetError && (
            <button
              onClick={this.handleResetClick}
              className="rounded bg-red-600 px-6 py-2 text-white transition-colors hover:bg-red-700"
            >
              Reload Application
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default FallbackUI;
