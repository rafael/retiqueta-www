var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var precss = require('precss');
var autoprefixer = require('autoprefixer');
var postcssImport = require('postcss-import')

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    './src/index.js'
  ],
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'scripts/bundle.js',
    publicPath: ''
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new ExtractTextPlugin('styles/bundle.css', { allChunks: true }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: true
    }),
    new webpack.DefinePlugin({
      'process.env.BACKEND_URL': JSON.stringify(process.env.BACKEND_URL)
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: [ 'babel' ],
        exclude: /node_modules/,
        include: path.resolve(__dirname, '../')
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader', {
          publicPath: '../'
        })
      },
      {
        test   : /\.(ttf|eot|svg|woff|woff2)$/,
        loader: 'file-loader?name=fonts/[name].[ext]'
      },
      {
        test: /\.(png|jpg)$/,
        loader: "url-loader?limit=10000&name=images/[name].[ext]"
      }
    ]
  },
  postcss: function () {
    return {
      plugins: [postcssImport, precss, autoprefixer],
    };
  }
}
