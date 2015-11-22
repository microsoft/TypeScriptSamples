/* eslint-disable no-var, strict, prefer-arrow-callback */
'use strict';

var path = require('path');
// var webpack = require('webpack');

module.exports = {
  cache: true,
  entry: {
    main: './src/main.tsx',
    vendor: [
      'react',
      'flux',
      'events',
      'babel/polyfill'
    ]
  },
  output: {
    path: path.resolve(__dirname, './dist/scripts'),
    filename: '[name].js',
    chunkFilename: '[chunkhash].js'
  },
  module: {
    loaders: [{
      test: /\.ts(x?)$/,
      exclude: /node_modules/,
      loader: 'babel-loader!ts-loader'
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel'
    }]
  },
  plugins: [
  ],
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
  },
};
