const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const pages = ["index", "about"];

module.exports = {
  entry: pages.reduce((config, page) => {
    config[page] = `./src/${page}.js`;
    return config;
  }, {}),
  devtool: 'inline-source-map',
  mode: 'development',
  output: {
    filename: '[name]/index.[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    publicPath: '/',
  },
  plugins: [].concat(
    pages.map(
      (page) =>
        new HtmlWebpackPlugin({
          inject: true,
          template: `./public/${page}.html`,
          filename: page === 'index' ? 'index.html' : `${page}/index.html`,
          chunks: [page],
          minify: {
            removeComments: true,
            collapseWhitespace: true
          }
        })
    ),
    new MiniCssExtractPlugin({
      filename: '[name]/index.[contenthash].css',
    })
  ),
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      // To import CSVs, TSVs, and XML you could use the csv-loader and xml-loader.
    ],
  },
  devServer: {
    static: './dist',
    compress: true,
  },
  optimization: {
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
        chunks: "all",
      },
    },
  },
};