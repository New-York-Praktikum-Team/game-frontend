const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const clientConfig = (_: undefined, { mode }: { mode: 'production' | 'development' }) => {
  const isDevelopment = mode === 'development';
  const isProduction = mode === 'production';

  let plugins: unknown[] = [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(path.join('www', 'favicon.ico')),
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
    },
    devtool: isDevelopment ? 'source-map' : false,
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

export default clientConfig;
