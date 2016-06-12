var webpack = require('webpack');
var config = require('./config');

config.entry = [
  'webpack-hot-middleware/client',
  './src/index.js'
]

config.plugins.push(new webpack.HotModuleReplacementPlugin());

module.exports = config
