import path from 'path';
import express from 'express';
import compression from 'compression';
import 'babel-polyfill';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfigs from '../webpack/client.config';
import { serverRenderMiddleware } from './server-render-middleware';

const app = express();
const clientConfig = webpackConfigs(undefined, { mode: 'development' });
const compiler = webpack({ ...clientConfig, mode: 'development' });

app.use(compression()).use(express.static(path.resolve(__dirname, '../dist')));

app.use(webpackHotMiddleware(compiler));
app.use(webpackDevMiddleware(compiler, { serverSideRender: true, writeToDisk: true }));

app.get('/*', serverRenderMiddleware);

export { app };
