var path = require('path')
var webpack = require('webpack')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.config')

module.exports = merge(common, {
  entry: {
    vendor: ['react', 'react-dom'],
  },
  // vendor的意思是依赖的第三方库，不会经常变更的，如你代码里的jQuery这种
  // CommonsChunkPlugin是指被你重复引用的chunks。可能是vendor，也可能是你自己的某个公共组件

  // 使用 DllPlugin 后 entry 命名被限制
  // 键值: 必须是数组
  // 键名: 不可以有符号‘-’(用驼峰法)


  output: {
    filename: '[name].dll.js',
    path: path.join(__dirname, 'dll'),
    publicPath: '/dll',
    library: '[name]_dll',
  },
  plugins: [
    new webpack.DllPlugin({
      context: __dirname,
      name: '[name]_dll',
      path: path.join(__dirname, 'dll' + '/[name]_manifest.json'),
      // DllReferencePlugin 的使用好像基于这个文件
    }),
  ],
})
