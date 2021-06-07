import { Component, ReactChild } from 'react';

export type Error = unknown;

export interface ErrorBoundaryProps {
  children: ReactChild | ReactChild[];
  fallback?: ReactChild | ReactChild[];
  onError?: (error?: Error, errorInfo?: Error) => void;
}

export interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, errorInfo: Error): void {
    const { onError } = this.props;

    // eslint-disable-next-line no-console
    console.log(error, errorInfo);

    if (onError) onError(error, errorInfo);

    this.setState({ hasError: true });
  }

  render(): ReactChild | ReactChild[] {
    const { fallback = null, children } = this.props;
    const { hasError } = this.state;

    return hasError ? fallback : children;
  }
}

export default ErrorBoundary;
