'use strict';
const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const RobotstxtPlugin = require('robotstxt-webpack-plugin').default;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const devMode = process.env.NODE_ENV !== 'production';

process.env.BABEL_ENV = devMode ? 'dev-webpack' : 'webpack';

module.exports = {
  cache: devMode,
  devtool: devMode ? 'cheap-module-source-map' : undefined,
  context: __dirname,
  performance: {
    hints: false
  },
  entry: {
    index: ['./src/index.js']
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
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'stylelint-custom-processor-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),

    // Javascript Plugins
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(
        devMode ? 'development' : 'production'
      )
    }),
    devMode ? new webpack.NamedModulesPlugin() : null,
    devMode ? new webpack.HotModuleReplacementPlugin() : null,
    // So moment doesn't blow everything up
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    !devMode ? new MinifyPlugin() : null,

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
    new FaviconsWebpackPlugin({
      logo: './static/images/favicon-base.jpg',
      prefix: 'static/images/favicons/',
      persistentCache: true,
      inject: true,
      title: 'Epochalypse Now'
    }),
    !devMode ? new ImageminPlugin({ test: /\.(jpe?g|png|gif|svg)$/i }) : null
  ].filter(Boolean)
};
