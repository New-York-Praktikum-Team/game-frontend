import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { Request, Response } from 'express';
import { StaticRouter } from 'react-router-dom';
import { Helmet, HelmetData } from 'react-helmet';
import { App } from '../../src/components/App';
import { store } from '../../src/store/store';
import { AppUrls } from '../../src/routes/appUrls';
import { RootState } from '../../src/store/rootReducer';
import { clearUser, fetchUserSuccess } from '../../src/store/user/actions';
import { transformUser } from '../../src/modules/transform';

const getHtml = (reactHtml: string, state: RootState, helmetData: HelmetData): string => (`
      <!DOCTYPE html>
      <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="shortcut icon" type="image/png" href="favicon.ico">
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto">
            <link rel="stylesheet" href="main.css">
            ${helmetData.title.toString()}
            ${helmetData.meta.toString()}
        </head>
        <body>
            <div id="root">${reactHtml}</div>
            <script>
              window.__INITIAL_STATE__ = ${JSON.stringify(state).replace(/</g, '\\\u003c')}
            </script>
            <script src="/bundle.js"></script>
        </body>
      </html>
    `);

export const serverRenderMiddleware = async (
  request: Request, response: Response,
): Promise<void> => {
  const location: string = request.url;

  if (response.locals.user) {
    await store.dispatch(fetchUserSuccess(transformUser(response.locals.user)));
  } else {
    await store.dispatch(clearUser());
  }

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

  const state = store.getState();

  response.status(pageIsAvailable ? 200 : 404).send(getHtml(reactHtml, state, helmetData));
};
