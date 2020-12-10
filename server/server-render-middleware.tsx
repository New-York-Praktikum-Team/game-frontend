import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { Request, Response } from 'express';
import { StaticRouter } from 'react-router-dom';
import { Helmet, HelmetData } from 'react-helmet';
import { App } from '../src/components/App';
import { store } from '../src/store/store';
import { AppUrls } from '../src/routes/appUrls';

function getHtml(reactHtml: string, reduxState = {}, helmetData: HelmetData) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="shortcut icon" type="image/png" href="favicon.ico">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto">
        ${helmetData.title.toString()}
        ${helmetData.meta.toString()}
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

export default (request: Request, response: Response) => {
  const location: string = request.url;

  const jsx = (
    <ReduxProvider store={store}>
      <StaticRouter location={location}>
        <App/>
      </StaticRouter>
    </ReduxProvider>
  );

  const reactHtml = renderToString(jsx);
  const helmetData = Helmet.renderStatic();

  const pageIsAvailable = (Object.values(AppUrls) as string[]).includes(request.path);

  response.status(pageIsAvailable ? 200 : 404).send(getHtml(reactHtml, {}, helmetData));
};
