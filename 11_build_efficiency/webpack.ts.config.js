const { merge } = require('webpack-merge')
const common = require('./webpack.common.config')

module.exports = merge(common, {
  entry: {
    'example-ts': './src/example-ts.ts',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          // 耗时: 351ms
          // 使用 ts-loader 编译 ts
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
            // ⬆️ 在编译时忽略(默认的)类型检查 (编译优化加速)
            // 耗时: 888ms (如果不设置)
          },
        },
      },
    ],
  },
})
