const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const webpack = require('webpack');
const path = require('path');

// 打包前清空目标目录
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// 配置 html 的模板
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 分解和压缩 css
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 压缩 svg
const svgToMiniDataURI = require('mini-svg-data-uri');

const { ProgressPlugin, DefinePlugin } = webpack;

// cdn 外链自动生成
const {
  title,
  favicon,
  JS_Externals,
  CSS_Externals,
} = require('./config/defaultSetting');

const externals = JS_Externals.reduce(
  (accu, { packagename, exportName }) => ({
    ...accu,
    [packagename]: exportName,
  }),
  {},
);

module.exports = merge(common, {
  mode: 'production',
  devtool: 'hidden-source-map', // 生成 source-map 但不发布； 而是上传到特定的监控服务器， 当客户端报错时，上传 row / col 信息到监控服务器， 即可定位源码位置
  // 外部引用包
  // externals,

  module: {
    rules: [
      // less
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: true, // 热更
              esModule: true,
            },
          },
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
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: true, // 热更
              esModule: true,
            },
          },
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
        test: /\.(png|jpg|jpeg|gif)$/,
        include: [path.resolve(__dirname, 'src/assets')],
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024 * 8,
              esModule: true,
              outputPath: 'imgs',
              name: 'dirname/[hash:8].[ext]',
              fallback: 'file-loader',
            },
          },
        ],
        use: ['file-loader'],
      },
      // svg 带压缩至内联
      {
        test: /\.svg$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              generator: (content) => svgToMiniDataURI(content.toString()),
              fallback: 'file-loader',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // 配置全局参数
    new DefinePlugin({
      'process.env': JSON.stringify('production'),
    }),
    new MiniCssExtractPlugin({
      filename: '[hash:8].css',
      chunkFilename: '[hash:8].css',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.ejs'),
      title,
      favicon,
      inject: true,
      minify: true,
      css_cdn: CSS_Externals,
      js_cdn: JS_Externals.map(({ link }) => link),
    }),
  ],
});
