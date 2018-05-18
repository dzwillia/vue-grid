'use strict'

const ExtractTextPlugin = require('extract-text-webpack-plugin')

const merge = require('deep-assign')
const webpack = require('webpack')

const options = require('./options')
const base = require('./webpack.base.js')

const config = merge(base, {
  // without this, webpack throws in a polyfill for node.js's Buffer class
  node: {
    Buffer: false,
    process: false
  },

  entry: options.paths.resolve('src/index.js'),

  output: {
    filename: options.isProduction ? 'vue-grid.min.js' : 'vue-grid.js',
    path: options.paths.output.main,
    library: 'VueGrid',
    libraryExport: 'default',
    libraryTarget: 'umd'
  },

  plugins: [
    new webpack.BannerPlugin({
      banner: options.banner,
      raw: true,
      entryOnly: true
    }),

    new ExtractTextPlugin({
      filename: options.isProduction ? 'vue-grid.min.css' : 'vue-grid.css'
    })
  ]
})

/*
// First item in module.rules array is Vue
config.module.rules[0].options.loaders = {
  scss: ExtractTextPlugin.extract({
    loader: 'css-loader!sass-loader',
    fallbackLoader: 'vue-style-loader'
  })
}
*/

// debug and production
config.plugins = config.plugins.concat([
  new webpack.LoaderOptionsPlugin({
    minimize: true
  }),
  new webpack.DefinePlugin({
    VERSION: JSON.stringify(options.version)
  })
])

if (options.isProduction) {
  // production only
  config.plugins = config.plugins.concat([
    // Set the production environment
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),

    // Minify with dead-code elimination
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ])
}

module.exports = config
