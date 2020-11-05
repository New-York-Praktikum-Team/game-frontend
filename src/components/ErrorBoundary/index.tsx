import React, { Component, ErrorInfo, Fragment } from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';

type ErrorBoundaryState = {
  hasError: boolean
};

class ErrorBoundaryHOC extends Component<RouteComponentProps, ErrorBoundaryState> {
  constructor(props: RouteComponentProps) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log(error);
    console.log(errorInfo);
  }

  public refresh() {
    window.location.reload();
  }

  public render() {
    const { hasError } = this.state;
    const { pathname } = this.props.location;
    const isHomePage = pathname === '/';

    if (hasError) {
      return (
        <section>
          <h1>Oops... Something went wrong.</h1>
          <p>Try <u onClick={this.refresh}>refreshing</u> the page,
            {isHomePage
              ? ' or come back later.'
              : <Fragment> or go to the <Link to="/">home</Link> page.</Fragment>}
          </p>
        </section>
      );
    }

    return this.props.children;
  }
}

export const ErrorBoundary = withRouter(ErrorBoundaryHOC);
