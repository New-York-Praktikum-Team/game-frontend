import { Configuration, HotModuleReplacementPlugin, WebpackPluginInstance } from 'webpack';
import path from 'path';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import { GenerateSW } from 'workbox-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const clientConfig = (_: undefined, { mode }: { mode: 'production' | 'development' }): Configuration => {
  const isProduction: boolean = mode === 'production';

  const entry: [string, ...string[]] = ['./src/client.tsx'];

  const plugins: WebpackPluginInstance[] = [
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
    plugins.push(new GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
      maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,
      modifyURLPrefix: { auto: '/' },
      cleanupOutdatedCaches: true,
      exclude: [/\.map$/],
      navigateFallback: '/index.html',
      navigationPreload: false,
    }));
  } else {
    entry.push('webpack-hot-middleware/client');
    plugins.push(new HotModuleReplacementPlugin());
  }

  return {
    mode,
    entry,
    plugins,
    output: {
      path: path.resolve('dist'),
      filename: 'bundle.js',
      publicPath: '/',
    },
    devtool: isProduction ? false : 'source-map',
    resolve: {
      extensions: ['*', '.js', '.jsx', '.tsx', '.ts'],
      plugins: [new TsconfigPathsPlugin()],
      alias: {
        'react-dom': '@hot-loader/react-dom',
      },
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
  };
};

export default clientConfig;
