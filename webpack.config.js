const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const multi = require('multi-loader');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new MiniCssExtractPlugin({
      filename: 'style.min.css'
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new OptimizeCssAssetsPlugin()
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
          { loader: process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'postcss-loader',
            options: {
              plugins: [
                autoprefixer({ grid: true, browsers: ['>1%'] })
              ]
            }
          },
          { loader: 'sass-loader' },
        ]
      },
      {
        test: /\.(jpe?g|png|webp)$/i,
        use: [
          {
            loader: multi(
            'file-loader!image-webpack-loader?{"mozjpeg":{"progressive":true}}',
            'file-loader?name=[hash].webp!image-webpack-loader?{"webp":{"quality":90}}')
          }
        ]
      },
      {
        test: /\.svg$/i,
        use: [
          { loader: 'file-loader'},
          { loader: 'image-webpack-loader'}
        ]
      }
    ]
  }
};