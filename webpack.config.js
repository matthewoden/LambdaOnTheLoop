var path = require('path');
var webpack = require('webpack');
var Clean = require('clean-webpack-plugin');

module.exports = {
  name: 'Lunch on The Loop (Lambda)',
  entry: { app: ['./src/index.js']},
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader?stage=0',
      exclude: /node_modules/
    },
    { test: /\.gif|\.png$/, loader: 'url-loader' },
    // Copy precomposed image files over to assets path
    { test: /.*precomposed\.png$/, loader: 'file-loader?name=images/[name].[ext]'},
    { test: /\.jpg$/, loader: 'file-loader' },
    { test: /\.json$/, loader: 'json' }]
  },
  modulesDirectories: ['node_modules'],
  output: {
    path: './',
    filename: 'index.js',
    libraryTarget: 'commonjs2'
  },
  plugins: [
  new Clean(['./build']),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin({compress: { warnings: false }, output: {comments: false} }),
  new webpack.IgnorePlugin(/vertx/)
  ],
  resolve: {
    extensions: ['', '.js']
  },
  target: 'node'
};
