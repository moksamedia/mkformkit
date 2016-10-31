var webpack = require('webpack');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var path = require('path');
var env = require('yargs').argv.mode;

var libraryName = 'mkformcomponents';

var plugins = [], outputFile;

if (env === 'build') {
  //plugins.push(new UglifyJsPlugin({ minimize: false }));
}

outputFile = 'index.js';

var config = {
  entry: __dirname + '/src/index.js',
  devtool: 'source-map',
  output: {
    path: __dirname + '/lib',
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
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
      /*
      {
        test: /(\.jsx|\.js)$/,
        loader: "eslint-loader",
        exclude: /node_modules/
      }
      */
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
