var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: path.resolve('app'),
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:9001',
    'webpack/hot/only-dev-server',
    './app'
  ],
  output: {
    path: path.resolve('/dist/'),
    publicPath: '/public/assets/',
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  devServer: {
    contentBase: 'public',
    hot: true,
    headers: { "Access-Control-Allow-Origin": "*" }
  },
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.css', '.scss']
  },
  plugins: [
    new ExtractTextPlugin("styles.css"),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.BannerPlugin("************\nWelcome to Stormify\n***************")
  ],
  module: {
    preloaders: [
      { 
        test: /\.js$/, 
        loader: "source-map-loader"
      }
    ],
    loaders: [
      { 
        test: /\.tsx$/,
        loader: 'ts-loader',
        exclude: /node_modules\/typings\/public/
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!autoprefixer-loader'),
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!autoprefixer-loader!sass-loader'),
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|jpeg|gif|ttf|eot)$/,
        loader: 'url-loader?limit=10000',
        exclude: /node_modules/
      }
    ]
  },
  externals: {
      "react": "React",
      "react-dom": "ReactDOM"
  }
}