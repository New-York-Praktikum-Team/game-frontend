const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  devServer: {
    hot: true,
    open: true,
    stats: 'errors-only',
    port: 3000,
    historyApiFallback: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['babel-loader', 'ts-loader', 'eslint-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: [
                [
                  'postcss-preset-env',
                ],
              ],
            },
          },
        },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|ico)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './www/index.html',
      favicon: './www/favicon.ico',
    }),
  ],
};
