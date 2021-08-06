import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const webpackConfig = {
  entry: './src/index.ts',
  module: {
    rules: [
      // babel
      {
        test: /\.(js|jsx|ts|tsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      // images
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource'
      },
      // fonts and SVG
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
      // css, postcss and sass
      {
        test: /\.(scss|css)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
      },
    ]
  },
  // live-server
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, 'src/static'),
    open: true,
    compress: true,
    hot: true,
    port: 8000,
    liveReload: true,
  },
  devtool: 'inline-source-map',
  plugins: [
    // html-template
    new HtmlWebpackPlugin({
      title: 'inquisition TS template',
      template: path.resolve(__dirname, './src/template.html'),
      filename: 'index.html',
      favicon: './src/static/icons/favicon.ico',
    }),
    // clean-webpack-plugin
    new CleanWebpackPlugin({
      dry: true,
      verbose: true,
      cleanStaleWebpackAssets: false,
      protectWebpackAssets: false,
    }),
    // copy plugin
    new CopyPlugin({
      patterns: [
        {
          from: './src/static', to: '.'
        }
      ]
    }),
    // mini-css plugin
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
  ],
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js'
  }
}

export default webpackConfig;