import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import path from 'path';
import nodeExternals from 'webpack-node-externals';

const fileRegex = /^(?!.*\.inline).*\.(svg|jpe?g|png|gif|eot|woff2?|ttf)$/;

const serverConfig = {
  entry: ['./index.ts'],
  name: 'server',
  target: 'node',
  node: { __dirname: false },
  externals: [nodeExternals({ allowlist: [/\.(?!(?:tsx?|json)$).{1,5}$/i] })],
  output: {
    libraryTarget: 'commonjs2',
    path: path.resolve('dist'),
    filename: 'server.js',
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' },
      },
      {
        test: /\.css$/,
        loader: 'null-loader',
      },
      {
        loader: 'null-loader',
        test: fileRegex,
      },
    ],
  },
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['*', '.js', '.jsx', '.json', '.ts', '.tsx'],
    plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })],
  },
  optimization: { nodeEnv: false },
};

export default serverConfig;
