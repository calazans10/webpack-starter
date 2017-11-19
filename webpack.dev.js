const common = require('./webpack.common.js');
const Dotenv = require('dotenv-webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const path = require('path');

module.exports = merge(common, {
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'build')
  },
  devtool: 'inline-source-map',
  devServer: {
    compress: true,
    contentBase: './build',
    host: '0.0.0.0'
  },
  plugins: [
    new Dotenv({
      path: './.env-development'
    }),
    new ExtractTextPlugin({
      filename: '[name].css'
    })
  ]
});
