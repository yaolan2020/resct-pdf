const WebpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.base.config.js');
const appConfig = require('./app.config.js');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const devConfig = {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    historyApiFallback: {
      index: appConfig.absolutePrefix + 'index.html'
    },
    open: true,
    openPage: appConfig.relativePrefix,
    port: 9000,
    hot: true,
    overlay: {
      errors: true
    }
  },
  module: {
    rules: [{
      test: /\.less$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            importLoaders: 2
          }
        },
        'postcss-loader',
        'less-loader'
      ]
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader',
        'postcss-loader'
      ]
    }]
  },
  plugins: [
    new ReactRefreshPlugin({ overlay: false }),   // react-refresh 添加
  ],
  output: {
    filename: '[name].[hash:8].js',
    publicPath: appConfig.absolutePrefix
  },
}

module.exports = WebpackMerge.merge(commonConfig, devConfig);
