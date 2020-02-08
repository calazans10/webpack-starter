const merge = require('webpack-merge');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const safePostCssParser = require('postcss-safe-parser');
const path = require('path');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: process.env.NODE_ENV,
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'build'),
  },
  devtool: 'source-map',
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
      }),
      new OptimizeCSSAssetsPlugin({
        parser: safePostCssParser,
        map: {
          inline: false,
          annotation: true,
        },
      }),
    ],
  },
  plugins: [
    new MiniCSSExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css',
    }),
  ],
});
