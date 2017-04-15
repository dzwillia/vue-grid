'use strict'

const merge = require('deep-assign')

const options = require('./options')
const base = require('./webpack.base.js')

const config = merge(base, {
  watch: true,
  devtool: '#eval-source-map',

  entry: options.paths.resolve('examples-src/index.js'),

  output: {
    filename: 'examples.bundle.js',
    path: options.paths.output.examples
  },

  devServer: {
    contentBase: options.paths.output.examples,
    host: '0.0.0.0',
    port: 9000,
    historyApiFallback: true,
    noInfo: true
  }
})

// First item in module.rules array is Vue
config.module.rules[0].options.loaders = {
  scss: 'vue-style-loader!css-loader!sass-loader'
}

module.exports = config
