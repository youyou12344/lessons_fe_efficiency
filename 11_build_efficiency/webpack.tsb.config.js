const { merge } = require('webpack-merge')
const common = require('./webpack.common.config')
// var TSCheckerPlugin = require('fork-ts-checker-webpack-plugin')
// ⬆️ 保留类型检查功能


module.exports = merge(common, {
  entry: {
    'example-ts': './src/example-ts.ts',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        // 耗时: 510ms 不使用 TSCheckerPlugin
        // 使用 babel-loader 编译 ts
        use: ['babel-loader'],
      },
    ],
  },
  plugins: [
    // 耗时: 1071ms 使用 TSCheckerPlugin
    // new TSCheckerPlugin({
    //   typescript: {
    //     diagnosticOptions: {
    //       semantic: true,
    //       syntactic: true,
    //     },
    //   },
    // }),
  ],
})
