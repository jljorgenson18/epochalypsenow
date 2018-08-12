'use strict';
const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const RobotstxtPlugin = require('robotstxt-webpack-plugin').default;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const devMode =
  process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'analysis';
const analysisMode = process.env.NODE_ENV === 'analysis';
process.env.BABEL_ENV = devMode ? 'dev-webpack' : 'webpack';

module.exports = {
  devtool: devMode ? 'cheap-module-source-map' : undefined,
  context: __dirname,
  mode: devMode ? 'development' : 'production',
  entry: {
    index: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'builds/[name].bundle.js',
    chunkFilename: 'builds/[name].bundle.js',
    publicPath: '/'
  },
  devServer: devMode
    ? {
        hot: true,
        historyApiFallback: true,
        stats: {
          modules: false,
          chunks: false,
          colors: true
        }
      }
    : undefined,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }]
      }
    ]
  },
  optimization: {
    minimizer: [new MinifyPlugin()]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    // Javascript Plugins
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(
        devMode ? 'development' : 'production'
      )
    }),
    devMode ? new webpack.HotModuleReplacementPlugin() : null,
    // General Assets
    new CopyWebpackPlugin([{ from: './static', to: 'static' }]),
    new HtmlWebpackPlugin({
      template: './template.html'
    }),
    new RobotstxtPlugin({
      policy: [
        {
          userAgent: '*',
          disallow: '/'
        }
      ]
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    !analysisMode
      ? new FaviconsWebpackPlugin({
          logo: './static/images/favicon-base.jpg',
          prefix: 'static/images/favicons/',
          persistentCache: true,
          inject: true,
          title: 'Epochalypse Now'
        })
      : null,
    !devMode && !analysisMode
      ? new ImageminPlugin({ test: /\.(jpe?g|png|gif|svg)$/i })
      : null,
    !devMode && !analysisMode
      ? new SWPrecacheWebpackPlugin({
          cacheId: 'epochalypsenow',
          dontCacheBustUrlsMatching: /\.\w{8}\./,
          filename: 'service-worker.js',
          minify: true,
          navigateFallback: '/',
          staticFileGlobsIgnorePatterns: [/\.map$/]
        })
      : null,
    analysisMode ? new BundleAnalyzerPlugin() : null
  ].filter(Boolean)
};
