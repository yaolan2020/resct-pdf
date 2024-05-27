const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const appConfig = require('./app.config.js');
const webpackUtils = require('./webpack.utils.js');
const srcPath = '../assets/';
const isDev = process.env.NODE_ENV === 'development';
const outputPath = isDev ? '' : appConfig.relativePrefix;

module.exports = {
  entry: path.resolve(__dirname, '../assets/index.js'),
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      components: path.join(__dirname, srcPath, 'components'),
      router: path.join(__dirname, srcPath, 'router'),
      store: path.join(__dirname, srcPath, 'store'),
      pages: path.join(__dirname, srcPath, 'pages'),
      api: path.join(__dirname, srcPath, 'api'),
      utils: path.join(__dirname, srcPath, 'utils'),
      public: path.join(__dirname, srcPath, 'public')
    }
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /.(js|jsx)$/,
        loader: 'eslint-loader',
        exclude: [
          path.resolve(__dirname, '../node_modules')
        ],
        options: {
          fix: true
        }
      },
      {
        test: /.(js|jsx)$/,
        loader: 'babel-loader',
        include: [path.resolve(__dirname, '../assets'), path.resolve(__dirname, '../node_modules/antd/locale')], 
        options: {
          cacheDirectory: true,
          plugins: [isDev && require.resolve('react-refresh/babel')].filter(Boolean),
        }
      },
      {
        test: /\.(png|jpg|gif|svg|pdf)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name].[contenthash:8].[ext]',
            limit: 10240,
            outputPath: outputPath + 'imgs/'
          }
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[contenthash:8].[ext]',
            outputPath: outputPath + 'fonts/'
          }
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[contenthash:8].[ext]',
            outputPath: outputPath + 'media/'
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.APP_PREFIX': JSON.stringify(appConfig.absolutePrefix)
    }),
    new HtmlWebpackPlugin({
      template: 'assets/index.html',
      templateParameters: {
        appPrefix: isDev ? '/' : appConfig.prodPublicPath + appConfig.relativePrefix,
        publishVersion: webpackUtils.getRandomMix(8),
        publishEnv: isDev ? 'dev': 'prod'
      },
      filename: outputPath + 'index.html',
      scriptLoading: 'blocking'
    }),
    new CleanWebpackPlugin(),
    new webpack.ContextReplacementPlugin(
      /moment[/\\]locale$/,
      /zh-cn|en/,
    )
  ],
  performance: false,
  output: {
    path: path.resolve(__dirname, '../dist')
  }
}
