const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const clientConfig = (_: undefined, { mode }: { mode: 'production' | 'development' }) => {
  const isProduction = mode === 'production';

  let plugins: unknown[] = [
    new MiniCssExtractPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(path.join('src', 'assets', 'icons', 'favicon.ico')),
          to: path.resolve('dist'),
        },
      ],
    }),
  ];

  if (isProduction) {
    plugins = [
      ...plugins,
      new GenerateSW({
        clientsClaim: true,
        skipWaiting: true,
        maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,
        modifyURLPrefix: {
          auto: '/',
        },
        cleanupOutdatedCaches: true,
        exclude: [/\.map$/],
        navigateFallback: '/index.html',
        navigationPreload: false,
      }),
    ];
  }

  return {
    entry: './src/client.tsx',
    output: {
      path: path.resolve('dist'),
      filename: 'bundle.js',
      publicPath: 'dist',
    },
    devtool: isProduction ? false : 'source-map',
    resolve: {
      extensions: ['*', '.js', '.jsx', '.tsx', '.ts'],
      plugins: [new TsconfigPathsPlugin()],
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|tsx|ts)$/,
          use: ['babel-loader'],
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: [{
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '/',
            },
          },
          'css-loader',
          ],
        },
        {
          test: /\.(png|jpe?g|gif|ico)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'static',
              },
            },
          ],
        },
      ],
    },
    plugins,
  };
};

export default clientConfig;
