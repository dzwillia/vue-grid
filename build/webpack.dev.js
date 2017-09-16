'use strict'

const merge = require('deep-assign')
const webpack = require('webpack')

const options = require('./options')
const base = require('./webpack.base.js')

const config = merge(base, {
  watch: true,
  devtool: '#eval-source-map',

  entry: options.paths.resolve('docs-src/index.js'),

  output: {
    filename: 'docs.bundle.js',
    path: options.paths.output.docs
  },

  plugins: [
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(options.version)
    })
  ],

  devServer: {
    contentBase: options.paths.output.docs,
    host: 'localhost',
    historyApiFallback: true,
    noInfo: true
  }
})

// First item in module.rules array is Vue
config.module.rules[0].options.loaders = {
  scss: 'vue-style-loader!css-loader!sass-loader'
}

config.plugins = config.plugins.concat([
  // TODO: Figure out how to do singleton includes of Lodash functions
  new webpack.ProvidePlugin({
    _: 'lodash'
  })
])

module.exports = config
