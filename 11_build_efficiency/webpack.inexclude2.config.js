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
        use: ['babel-loader'],
      },
    ],
  },
})
