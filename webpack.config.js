const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css"
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html',
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    watchContentBase: true,
    hot: true,
    host: '0.0.0.0'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          { loader: process.env.NODE_ENV === "production" ? MiniCssExtractPlugin.loader : 'style-loader' },
          { loader: 'css-loader' },
          { loader: "sass-loader" },
        ]
      }
    ]
  }
};