var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: {
    vendor: [
      'lodash',
      'vue',
      'vuex',
      'vue-resource',
      'vue-router',
      'vee-validate',
      'keen-ui',
      'filesize',
      'clipboard',
      'moment',
      'jquery',
      'tinycolor2',
      'codemirror'
    ],
    app: './src/main.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: '[name].js'
  },
  module: {
    rules: [
      // allow support for .vue file syntax:
      // ref. https://vue-loader.vuejs.org/en/start/spec.html
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          // vue-loader options go here
        }
      },
      // allow support for ECMAScript 6
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      // extract css files
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!autoprefixer-loader'
      },
      // extract less files
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!autoprefixer-loader!less-loader'
      },
      // compress images before outputting them
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        loaders: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/[name]-[hash].[ext]'
            }
          },
          {
            loader: 'image-webpack-loader',
            query: {
              progressive: true,
              optimizationLevel: 7,
              interlaced: false,
              pngquant: {
                quality: '65-90',
                speed: 4
              }
            }
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue',
      'jquery': 'jquery/src/jquery'
    }
  },
  devServer: {
    historyApiFallback: {
      index: './src/index-dev.html'
    },
    noInfo: true
  },
  devtool: '#eval-source-map'
}

/* dev plugins */

// http://vue-loader.vuejs.org/en/workflow/production.html
module.exports.plugins = (module.exports.plugins || []).concat([
  new webpack.ProvidePlugin({
    _: 'lodash',
    $: 'jquery',
    jQuery: 'jquery',
    Clipboard: 'clipboard',
    tinycolor: 'tinycolor2'
  })
])
