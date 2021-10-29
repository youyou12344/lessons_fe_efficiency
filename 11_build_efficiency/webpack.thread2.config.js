const path = require('path')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.config')

// threadLoader.warmup({}, [
//   'babel-loader',
//   '@babel/preset-env',
//   '@babel/preset-react',
//   '@babel/preset-typescript',
// ])

module.exports = merge(common, {
  entry: {
    'example-thread': './src/example-thread.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['@babel/preset-typescript', '@babel/preset-react','@babel/preset-env', 'babel-loader'],
      },
    ],
  },
})
