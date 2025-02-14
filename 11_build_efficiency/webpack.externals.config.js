const { merge } = require('webpack-merge')
const common = require('./webpack.common.config')

module.exports = merge(common, {
  entry: {
    'example-externals': './src/example-externals.js',
  },
  externals: {
    jquery: '$', // jquery CND 返回: 全局对象 $
    // 依赖包需要单独指定依赖模块的加载方式：全局对象、CommonJS、AMD
  },
})
