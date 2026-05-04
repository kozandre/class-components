import { Component } from 'react';

import ErrorBoundary from '@features/error-handling/error-boundary';

import FallbackUI from '@features/error-handling/fallback-ui';

import Home from '@pages/home';

class App extends Component {
  handleGlobalError = (error: Error, errorInfo: React.ErrorInfo) => {
    console.error('Global error caught in App:', error);
    console.error('Error info:', errorInfo);
  };

  render() {
    return (
      <ErrorBoundary fallback={<FallbackUI />} onError={this.handleGlobalError}>
        <Home />
      </ErrorBoundary>
    );
  }
}

export default App;
