const { merge } = require('webpack-merge')
const common = require('./webpack.common.config')

module.exports = merge(common, {
  entry: {
    'example-inexclude': './src/example-inexclude.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: /src|jquery/,
        // 这里的 include jquery 将不生效，因为 exclude 优先级更高
        exclude: /node_modules/,
        // 使用 babel-loader 处理自己写的普通模块
        use: ['babel-loader'],
      },
    ],
  },
})
