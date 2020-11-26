const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');

module.exports = (env: undefined, { mode }: { mode: 'production' | 'development' }) => {
  const isDevelopment = mode === 'development';
  const isProduction = mode === 'production';

  let plugins = [
    new HtmlWebpackPlugin({
      template: './www/index.html',
      favicon: './www/favicon.ico',
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
    entry: './src/index.tsx',
    output: {
      path: path.join(__dirname, '/dist'),
      filename: 'bundle.js',
    },
    devtool: isDevelopment ? 'source-map' : false,
    devServer: {
      hot: true,
      open: true,
      stats: 'errors-only',
      port: 3000,
      historyApiFallback: true,
    },
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
