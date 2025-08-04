// src/components/ErrorBoundary.tsx

import { Component, ReactNode } from 'react';
import type { ErrorInfo, ErrorBoundaryState } from '../types';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

/**
 * Error Boundary component to catch and handle React errors gracefully
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo
    });

    // Call optional error handler
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div className="error-boundary-container p-6 bg-surface-base border border-lines-light rounded-lg">
          <div className="flex items-center mb-4">
            <div className="flex-shrink-0">
              <svg 
                className="h-5 w-5 text-critical" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path 
                  fillRule="evenodd" 
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" 
                  clipRule="evenodd" 
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-critical">
                Something went wrong
              </h3>
            </div>
          </div>
          
          <div className="text-sm text-body-and-labels mb-4">
            <p>The application encountered an unexpected error. Please try refreshing the page or contact support if the problem persists.</p>
          </div>

          {this.state.error && (
            <details className="mb-4">
              <summary className="text-sm font-medium text-critical cursor-pointer hover:opacity-80">
                Error Details
              </summary>
              <div className="mt-2 text-xs text-body-and-labels font-mono bg-surface-inner p-2 rounded border border-lines-light">
                <div className="mb-2">
                  <strong>Error:</strong> {this.state.error.message}
                </div>
                {this.state.errorInfo && (
                  <div>
                    <strong>Component Stack:</strong>
                    <pre className="whitespace-pre-wrap mt-1">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  </div>
                )}
              </div>
            </details>
          )}

          <div className="flex space-x-3">
            <button
              type="button"
              onClick={this.handleReset}
              className="inline-flex items-center px-3 py-2 border border-lines-light shadow-sm text-sm leading-4 font-medium rounded-md text-text-and-icons bg-surface-base hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-focus"
            >
              Try Again
            </button>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-text-and-icons bg-critical hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-focus"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
