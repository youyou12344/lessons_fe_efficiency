const { merge } = require('webpack-merge')
const common = require('./webpack.common.config')

module.exports = merge(common, {
  entry: {
    'example-noparse': './src/example-noparse.js',
  },
  // mode: 'development',
  // devtool: 'source-map',
  module: {
    noParse: /jquery|lodash/, // 2、不使用 Webpack 默认 js 模块编译器进行编译
    // 注意： 可以使用 babel-loader 编译(即注释掉exclude配置)，但不使用 Webpack 默认 编译。速度超慢！！！
    rules: [
      {
        test: /\.js$/,
        exclude: /jquery|lodash/, // 1、不使用 babel-loader 编译
        use: ['babel-loader'],
      },
    ],
  },
})
