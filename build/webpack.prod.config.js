const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const WebpackMerge = require('webpack-merge');
const appConfig = require('./app.config.js');
const webpackUtils = require('./webpack.utils.js');
const commonConfig = require('./webpack.base.config.js');
const prodConfig = module.exports = {
  mode: 'production',
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: webpackUtils.getCssPublicPath(appConfig)
            }
          },
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
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: webpackUtils.getCssPublicPath(appConfig)
            }
          },
          'css-loader',
          'postcss-loader'
        ]
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserJSPlugin({
        cache: true,
        parallel: 4
      })
    ],
    usedExports: true,
    splitChunks: {
      chunks: 'all',
      automaticNameDelimiter: '.',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        commons: {
          name: 'commons',
          chunks: 'initial',
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    },
    runtimeChunk: {
      name: 'runtime'
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: appConfig.relativePrefix + 'css/[name].[contenthash:8].css',
      ignoreOrder: true
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: appConfig.relativePrefix + 'static',
        ignore: ['.*']
      },
      {
        from: path.resolve(__dirname, '../styles'),
        to: appConfig.relativePrefix + 'styles',
        ignore: ['.*']
      }
    ]),
    new FileManagerPlugin({
      events: {
        onEnd: {
          delete: ['./dist.zip'],
          archive: [
            { source: './dist', destination: './dist.zip' }
          ],
        }
      },
    })
  ],
  output: {
    filename: appConfig.relativePrefix + 'js/[name].[chunkhash:8].js',
    chunkFilename: appConfig.relativePrefix + 'js/[name].[chunkhash:8].js',
    publicPath: appConfig.prodPublicPath || '/'
  }
};
module.exports = WebpackMerge.merge(commonConfig, prodConfig);
