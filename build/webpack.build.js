var path = require('path')
var webpack = require('webpack')
var WebpackMd5Hash = require('webpack-md5-hash')
var AssetsPlugin = require('assets-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

// debug vs. production constants
var IS_DEBUG = (process.env.NODE_ENV === 'production') ? false : true
var OUTPUT_FILENAME = IS_DEBUG ? '[name].js' : '[name]-[chunkhash].js'
var EXTRACT_TEXT_FILENAME = IS_DEBUG ? 'css/style.css' : 'css/style-[contenthash].css'
var SHOW_BUNDLE_ANALYZER = false

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
    filename: OUTPUT_FILENAME
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
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader!autoprefixer-loader'
        })
      },
      // extract less files
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader!autoprefixer-loader!less-loader'
        })
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
  devtool: '#source-map'
}

/* debug and production plugins */

// http://vue-loader.vuejs.org/en/workflow/production.html
module.exports.plugins = (module.exports.plugins || []).concat([
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"production"'
    }
  }),
  new webpack.ProvidePlugin({
    _: 'lodash',
    $: 'jquery',
    jQuery: 'jquery',
    Clipboard: 'clipboard',
    tinycolor: 'tinycolor2'
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: Infinity
  }),
  new WebpackMd5Hash(), // use standard md5 hash when using [chunkfile]
  new webpack.optimize.UglifyJsPlugin({
    sourceMap: true,
    compress: {
      warnings: false
    }
  }),
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/), // TODO: find out if there's a no-locale moment.js NPM repo
  new webpack.LoaderOptionsPlugin({
    minimize: true
  }),
  new AssetsPlugin({
    filename: './src/build/assets.json',
    prettyPrint: true
  }),
  new ExtractTextPlugin({
    filename: EXTRACT_TEXT_FILENAME
  }),
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, './src/index-template.ejs'), // load a custom template (ejs by default see the FAQ for details)
    filename: path.resolve(__dirname, './src/build/index-template.html')
  }),
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, './src/index-template.ejs'), // load a custom template (ejs by default see the FAQ for details)
    filename: path.resolve(__dirname, '../application/views/layout.phtml')
  })
])

if (IS_DEBUG)
{
  /* debug-only plugins */
  if (SHOW_BUNDLE_ANALYZER)
  {
    module.exports.plugins = module.exports.plugins.concat([
      new BundleAnalyzerPlugin()
    ])
  }
}
 else
{
  /* production-only plugins */
}
