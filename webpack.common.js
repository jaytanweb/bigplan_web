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
  PORT,
  JS_Externals,
  CSS_Externals,
} = require('./config/defaultSetting');

module.exports = {
  entry: './src/index.tsx',

  output: {
    filename: '[name].[hash:8].js',
    path: path.resolve(__dirname, 'dist'),
  },

  target: 'web',

  resolve: {
    // 解析的文件
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.less', '.css', 'scss'],
    // 路径 alias, 在 tsconfig 中也要对应配置， 方便编辑器寻路
    alias: {
      '@src': path.resolve(__dirname, './src'),
      '@util': path.resolve(__dirname, './src/utils'),
      '@asset': path.resolve(__dirname, './src/assets'),
      '@page': path.resolve(__dirname, './src/pages'),
      '@model': path.resolve(__dirname, './src/models'),
      '@api': path.resolve(__dirname, './src/api'),
      '@component': path.resolve(__dirname, './src/components'),
      '@layout': path.resolve(__dirname, './src/layouts'),
    },
  },

  module: {
    rules: [
      // ts / js
      {
        test: /\.(t|j)s(x?)$/,
        exclude: /node_modules/,
        use: ['ts-loader'],
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'source-map-loader',
      },
      // 字体
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader'],
      },
    ],
  },

  plugins: [
    // 打包进度展示
    new ProgressPlugin({
      activeModules: false,
      handler: (percentage, msg, detail) => {},
    }),

    new CleanWebpackPlugin(),
  ],
};
