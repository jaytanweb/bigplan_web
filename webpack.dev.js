const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const webpack = require('webpack');
const path = require('path');

// 配置 html 的模板
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { ProgressPlugin, DefinePlugin } = webpack;

// cdn 外链自动生成
const { title, favicon, PORT } = require('./config/defaultSetting');

module.exports = merge(common, {
  mode: 'development',
  // 本地开发配置
  devServer: {
    contentBase: './dist',
    port: PORT,
  },
  devtool: 'inline-source-map',

  module: {
    rules: [
      // less
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
              sourceMap: true,
              esModule: true,
            },
          },
          'postcss-loader',
          'less-loader',
        ],
      },
      // scss / css
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src'),
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
              sourceMap: true,
              esModule: true,
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
      // 图片
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        include: [path.resolve(__dirname, 'src/assets')],
        use: ['file-loader'],
      },
    ],
  },
  plugins: [
    // 配置全局参数
    new DefinePlugin({
      'process.env': JSON.stringify('development'),
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.ejs'),
      title,
      favicon,
      inject: true,
      minify: false,
      css_cdn: [],
      js_cdn: [],
    }),
  ],
});
