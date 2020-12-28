import path from 'path';
import express from 'express';
import compression from 'compression';
import 'babel-polyfill';
// eslint-disable-next-line import/no-extraneous-dependencies
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackConfigs from '../webpack/client.config';
import { serverRenderMiddleware } from './server-render-middleware';

const app = express();
const compiler = webpack(webpackConfigs(undefined, { mode: 'development' }));

app.use(compression()).use(express.static(path.resolve(__dirname, '../dist')));

app.use(webpackDevMiddleware(compiler));

app.get('/*', serverRenderMiddleware);

export { app };
