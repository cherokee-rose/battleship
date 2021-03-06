const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/app.ts',
  },
  devtool: 'eval',
  devServer: {
    static: './dist',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.(css|sass|scss)$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(html)$/i,
        use: ['html-loader'],
      },
      {
        test: /\.(jpe?g|svg|png|gif|ico|eot|ttf|woff2?)(\?v=\d+\.\d+\.\d+)?$/i,
        type: 'asset/resource',
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-typescript'],
              plugins: ['@babel/plugin-transform-runtime'],
            },
          },
          {
            loader: 'ts-loader',
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.d.ts', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: './index.html',
      template: './src/index.html',
    }),
    new webpack.WatchIgnorePlugin({
      paths: [/\.js$/, /\.d\.ts(\.map)?$/],
    }),
  ],
};
