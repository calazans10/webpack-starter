const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const path = require('path');

const isEnvDevelopment = process.env.NODE_ENV === 'development';
const isEnvProduction = process.env.NODE_ENV === 'production';

module.exports = {
  entry: {
    main: './src/scripts/main.js',
    vendor: ['jquery'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [
          isEnvDevelopment && require.resolve('style-loader'),
          isEnvProduction && {
            loader: MiniCSSExtractPlugin.loader,
            options: { hmr: isEnvDevelopment },
          },
          {
            loader: require.resolve('css-loader'),
            options: { importLoaders: 1 },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                require('postcss-preset-env')({
                  autoprefixer: {
                    flexbox: 'no-2009',
                  },
                  stage: 3,
                }),
              ],
            },
          },
          { loader: require.resolve('sass-loader') },
        ].filter(Boolean),
      },
      {
        test: /\.(html)$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true,
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        use: ['file-loader'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [path.join(process.cwd(), 'build/**/*')],
    }),
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
  ],
};
