import path from 'path';
import express from 'express';
import compression from 'compression';
import 'babel-polyfill';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import cookieParser from 'cookie-parser';
import webpackClientConfig from '../webpack/client.config';
import { serverRenderMiddleware } from './middlewares/server-render-middleware';
import { serverUserAuthMiddleware } from './middlewares/server-user-auth-middleware';
import api from './api';

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(compression()).use(express.static(path.resolve(__dirname, '../dist')));

if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(webpackClientConfig(undefined, { mode: 'development' }));
  app.use(webpackHotMiddleware(compiler));
  app.use(webpackDevMiddleware(compiler, { serverSideRender: true, writeToDisk: true }));
}

app.use(serverUserAuthMiddleware);
app.use('/api', api);
app.get('/*', serverRenderMiddleware);

export { app };
