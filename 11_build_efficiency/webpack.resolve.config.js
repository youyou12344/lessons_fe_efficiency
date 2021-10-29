const { merge } = require('webpack-merge')
const common = require('./webpack.common.config')

module.exports = merge(common, {
  entry: {
    'example-resolve': './src/example-resolve.js',
  },
  resolve: {
    // 指定查找模块

    modules: ['../node_modules'],
    extensions: ['.js'],
    mainFiles: ['index'],
    symlinks: false,
  },
})
