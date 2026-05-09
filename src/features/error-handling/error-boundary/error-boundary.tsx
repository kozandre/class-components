import { Component, type ErrorInfo } from 'react';

import { FallbackUI } from '../fallback-ui';

import type {
  ErrorBoundaryProps,
  ErrorBoundaryState,
} from '../error-handling.types';

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    console.error('Error caught by getDerivedStateFromError:', error);
    return {
      hasError: true,
      error: error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Error Boundary caught an error:', error);
    console.error('Component stack:', errorInfo.componentStack);
    this.props.onError?.(error, errorInfo);
  }

  resetError = () => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <FallbackUI error={this.state.error} resetError={this.resetError} />
      );
    }

    return this.props.children;
  }
}
