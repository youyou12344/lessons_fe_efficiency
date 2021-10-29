const { merge } = require('webpack-merge')
const common = require('./webpack.common.config')

module.exports = merge(common, {
  entry: {
    'example-resolve': './src/example-resolve.js',
  },
  resolve: {
    // resolve 指定查找模块
    // 耗时: 1568ms (优化，精简下面的属性)
    // 耗时: 2125ms (不优化)
    
    // 1、目录范围
    modules: ['../node_modules'],
    // modules: Array(100)
    //   .fill('')
    //   .map((item, index) => '../node_modules' + index)
    //   .concat(['../node_modules']),
    
    // 2、文件类型范围
    extensions: ['.js'],
    // extensions: Array(100)
    //   .fill('')
    //   .map((item, index) => '.ex' + index)
    //   .concat(['.js']),

    // 3、查找模块的 package.json 中主文件的属性名
    mainFiles: ['index'],
    // mainFiles: Array(100)
    //   .fill('')
    //   .map((item, index) => 'index' + index)
    //   .concat(['index']),

    // 4、查找模块时,是否处理软连接
    symlinks: false,
    // symlinks: true,

  },
})
