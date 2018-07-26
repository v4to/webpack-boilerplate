const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const multi = require('multi-loader');
let devServer;

// Ability to reload html
function reloadHtml() {
  const cache = {};
  const plugin = { name: 'CustomHtmlReloadPlugin' };
  this.hooks.compilation.tap(plugin, compilation => {
    compilation.hooks.htmlWebpackPluginAfterEmit.tap(plugin, data => {
      const orig = cache[data.outputName];
      const html = data.html.source();
      // plugin seems to emit on any unrelated change?
      if (orig && orig !== html) {
        devServer.sockWrite(devServer.sockets, 'content-changed');
      }
      cache[data.outputName] = html;
    });
  });
}

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
      template: './src/index.html'
    }),
    reloadHtml,
    new webpack.HotModuleReplacementPlugin(),
    new OptimizeCssAssetsPlugin(),
    new SpriteLoaderPlugin({ plainSprite: true })
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    before: function (app, server) {
      devServer = server;
    },
    hot: true,
    host: '0.0.0.0'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader:
              process.env.NODE_ENV === 'production'
                ? MiniCssExtractPlugin.loader
                : 'style-loader'
          },
          { loader: 'css-loader' },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [autoprefixer({ grid: true, browsers: ['>1%'] })]
            }
          },
          { loader: 'sass-loader' }
        ]
      },
      {
        test: /\.(jpe?g|png|webp)$/i,
        use: [
          {
            loader: multi(
              'file-loader?name=[name].[ext]!image-webpack-loader?{"mozjpeg":{"progressive":true}}',
              'file-loader?name=[name].webp!image-webpack-loader?{"webp":{"quality":90}}'
            )
          }
        ]
      },
      {
        test: /\.svg$/i,
        exclude: path.resolve(__dirname, 'src/sprite'),
        use: [
          { loader: 'file-loader?name=[name].[ext]' },
          { loader: 'image-webpack-loader' }
        ]
      },
      {
        test: /\.svg$/i,
        include: path.resolve(__dirname, 'src/sprite'),
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              extract: true
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          { loader: 'file-loader?name=[name].[ext]' }
        ]
      }
    ]
  }
};
