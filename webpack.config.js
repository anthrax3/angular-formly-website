var path = require('path');
var fs = require('fs');
var webpack = require('webpack');
var _ = require('lodash');

var dev = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: './app',
  output: {
    filename: 'bundle.js',
    path: __dirname
  },

  stats: {
    colors: true,
    reasons: true
  },

  devtool: dev ? 'eval' : null,

  plugins: [
    new webpack.DefinePlugin({
      ON_DEV: dev
    })
  ],

  resolve: {
    extensions: ['', '.js'],
    modulesDirectories: ['shared', 'node_modules', 'bower_components'],
    alias: {
      // sadly have to do this because formly's trying to load it's version of angular
      // which is different from the one in the demo folder... Nesting with node_modules
      // and requiring files outside of this is a little odd...
      // Nobody else will have to do this!
      angular: path.join(__dirname, '/node_modules/angular/angular'),
      stateUtils: path.join(__dirname, '/app/shared/ngCommon/services/stateUtils')
    }
  },

  module: {
    loaders: [
      {test: /\.css$/, loader: 'style!css!postcss'},
      {test: /\.html$/, loader: 'raw', exclude: /node_modules/},
      {test: /\.md$/, loader: 'html!markdown'},
      {test: /\.json$/, loader: 'json'},
      {test: /\.png$/, loader: 'url?mimetype=image/png'},
      {test: /\.js$/, loader: 'ng-annotate!babel!jshint', exclude: /node_modules/},
      {
        test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader?name=res/[name].[ext]?[hash]'
      }
    ]
  },

  jshint: {
    failOnHint: true,
    emitErrors: true
  },
  postcss: [
    require('postcss-nested'),
    require('autoprefixer-core'),
    require('csswring')
  ]
};
