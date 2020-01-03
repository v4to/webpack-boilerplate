const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminWebpackPlugin = require('imagemin-webpack-plugin').default;
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');


module.exports = {
  // mode: 'development',
  devtool: 'source-map',
  entry: ['./src/index.js'],
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist'),
  },
  // plugins: [
  //   new CleanWebpackPlugin(['dist']),
  //   new MiniCssExtractPlugin({
  //     filename: 'style.min.css',
  //   }),
  //   new HtmlWebpackPlugin({
  //     filename: 'index.html',
  //     template: './src/index.html',
  //   }),
  //   new CopyWebpackPlugin([{
  //     from: 'src/img',
  //     to: 'img',
  //   }, {
  //     from: 'src/fonts',
  //     to: 'fonts',
  //   }]),
  //   new ImageminWebpackPlugin({
  //     test: /\.(jpe?g|png|gif|jpg)$/i,
  //     jpegtran: {
  //       progressive: true,
  //     },
  //   }),
  //   new SVGSpritemapPlugin('src/icons/**/*.svg', {
  //     output: {
  //       svgo: {
  //         plugins: [{
  //           removeAttrs: {
  //             attrs: 'path:fill',
  //           },
  //         },
  //         ],
  //       },
  //     },
  //     sprite: {
  //       generate: {
  //         use: true,
  //       },
  //     },
  //   }),
  // ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: false,
    open: true,
    // port: 1337
    // writeToDisk: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      // {
      //   // test: /\.scss$/,
      //   test: /\.styl$/,
      //   use: [
      //     {
      //       loader: MiniCssExtractPlugin.loader,
      //     },
      //     {
      //       loader: 'css-loader',
      //       options: {
      //         sourceMap: true,
      //         minimize: true,
      //       },
      //     },
      //     {
      //       loader: 'postcss-loader',
      //       options: {
      //         plugins: [autoprefixer({ grid: true })],
      //         sourceMap: true,
      //       },
      //     },
      //     {
      //       loader: 'stylus-loader',
      //       // options: {
      //       //   sourceMap: true,
      //       //   outputStyle: 'compressed',
      //       // },
      //     },
      // {
      //   loader: 'sass-loader',
      //   options: {
      //     sourceMap: true,
      //     outputStyle: 'compressed',
      //   },
      // },
    ],
  },
  // {
  //   test: /\.(jpe?g|png|webp)$/i,
  //   use: [
  //     {
  //       loader: multi(
  //         'file-loader?name=img/[name].[ext]!image-webpack-loader?{"mozjpeg":{"progressive":true}}',
  //         'file-loader?name=img/[name].webp!image-webpack-loader?{"webp":{"quality":90}}'
  //       ),
  //     },
  //   ],
  // },
  // {
  //   test: /\.svg$/i,
  //   exclude: path.resolve(__dirname, 'src/icons'),
  //   use: [
  //     // { loader: 'file-loader?name=img/[name].[ext]' },
  //     // { loader: 'image-webpack-loader' },
  //   ],
  // },
  // {
  //   test: /\.svg$/i,
  //   include: path.resolve(__dirname, 'src/icons'),
  //   use: [
  //     {
  //       loader: 'svg-sprite-loader',
  //       options: {
  //         extract: true,
  //         spriteFilename: 'img/sprite.svg',
  //       },
  //     },
  //   ],
  // },
  // {
  //   test: /\.(woff|woff2|eot|ttf|otf)$/,
  //   use: [
  //     { loader: 'file-loader?name=fonts/[name].[ext]' },
  //   ],
  // },
};
