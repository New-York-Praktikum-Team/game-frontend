import React, { Component, ErrorInfo } from 'react';

type IErrorBoundaryProps = {};

type IErrorBoundaryState = {
  hasError: boolean
};

export class ErrorBoundary extends Component<IErrorBoundaryProps, IErrorBoundaryState> {
  constructor(props: IErrorBoundaryProps) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    window.console.log(error);
    window.console.log(errorInfo);
  }

  public render() {
    const { hasError } = this.state;

    if (hasError) {
      return (
        <section>
          <h1>Oops... Something went wrong.</h1>
          <p>Try refreshing the page.</p>
        </section>
      );
    }

    return this.props.children;
  }
}
