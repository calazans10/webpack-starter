const common = require('./webpack.common.js');
const Dotenv = require('dotenv-webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(common, {
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'build')
  },
  devtool: 'source-map',
  plugins: [
    new Dotenv({
      path: './.env-production'
    }),
    new ExtractTextPlugin({
      filename: '[name].[contenthash].css'
    }),
    new UglifyJSPlugin({
      sourceMap: true
    })
  ]
});
