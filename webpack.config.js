var webpack = require('webpack');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var path = require('path');
var env = require('yargs').argv.mode;

var plugins = [];

if (env === 'build') {
  //plugins.push(new UglifyJsPlugin({ minimize: false }));
}

var config = {
  entry: __dirname + '/src/index.js',
  devtool: 'source-map',
  output: {
    path: __dirname + '/lib',
    filename: 'index.js',
    library: 'mkformcomponents',
    libraryTarget: 'commonjs2'
  },
  module: {
    loaders: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/,
        query: {
          presets: [
            "es2015-loose",
            "react",
            "stage-0"
          ],
          plugins: [
            "transform-runtime"
          ],
          compact: false
        }
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      }
    ]
  },
  resolve: {
    root: path.resolve('./src'),
    extensions: ['', '.js']
  },
  plugins: plugins,
  externals: {
    react: 'react',
    "react-bootstrap" : 'react-bootstrap',
    "react-dom": 'react-dom',
    "react-addons-shallow-compare": 'react-addons-shallow-compare'
  }
};

module.exports = config;
