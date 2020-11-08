import React, { PureComponent, ErrorInfo, Fragment } from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { AppUrls } from '../../routes/appUrls';

type ErrorBoundaryState = {
  hasError: boolean
};

class WithRouterErrorBoundary extends PureComponent<RouteComponentProps, ErrorBoundaryState> {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError = (): Record<'hasError', boolean> => ({ hasError: true });

  public componentDidCatch = (error: Error, errorInfo: ErrorInfo):void => {
    // eslint-disable-next-line no-console
    console.log(error);
    // eslint-disable-next-line no-console
    console.log(errorInfo);
  };

  public refresh = ():void => {
    window.location.reload();
  };

  public render() {
    const { hasError } = this.state;
    const { location: { pathname }, children } = this.props;
    const isHomePage = pathname === AppUrls.Home;

    if (hasError) {
      return (
        <section>
          <h1>Oops... Something went wrong.</h1>
          <p>Try <u onClick={this.refresh}>refreshing</u> the page,
            {isHomePage
              ? ' or come back later.'
              : <Fragment> or go to the <Link to={AppUrls.Home}>home</Link> page.</Fragment>}
          </p>
        </section>
      );
    }

    return children;
  }
}

export const ErrorBoundary = withRouter(WithRouterErrorBoundary);
