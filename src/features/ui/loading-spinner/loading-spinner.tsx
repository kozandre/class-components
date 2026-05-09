import { Component } from 'react';

class LoadingSpinner extends Component {
  render() {
    return (
      <div
        className="flex items-center justify-center py-8"
        aria-label="Loading"
      >
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600" />
      </div>
    );
  }
}

export default LoadingSpinner;
