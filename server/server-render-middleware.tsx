import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { Request, Response } from 'express';
import { StaticRouter } from 'react-router-dom';
import { StaticRouterContext } from 'react-router';
import { App } from '../src/components/App';
import { store } from '../src/store/store';

function getHtml(reactHtml: string, reduxState = {}) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="shortcut icon" type="image/png" href="favicon.ico">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto">
        <title>Numa Game</title>
    </head>
    <body>
        <div id="root">${reactHtml}</div>
        <script>
              window.__INITIAL_STATE__ = ${JSON.stringify(reduxState)}
        </script>
        <script src="/bundle.js"></script>
    </body>
    </html>
    `;
}

export default (req: Request, res: Response) => {
  const location: string = req.url;
  const context: StaticRouterContext = {};

  const jsx = (
    <ReduxProvider store={store}>
      <StaticRouter context={context} location={location}>
        <App />
      </StaticRouter>
    </ReduxProvider>
  );

  const reactHtml = renderToString(jsx);

  if (context.url) {
    res.redirect(context.url);
    return;
  }

  res.status(context.statusCode || 200).send(getHtml(reactHtml, {}));
};
