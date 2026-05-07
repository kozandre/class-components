import type { ErrorInfo, ReactNode } from 'react';

export interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export interface FallbackUIProps {
  error?: Error | null;
  resetError?: () => void;
}

export interface ErrorTestButtonProps {
  onError?: () => void;
}
