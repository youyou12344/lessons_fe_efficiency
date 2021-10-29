#!/usr/bin/env sh

funPstr (){
    printf "\n\n\033[1m\033[40;43m $str \033[0m\n"
}
funPcommand () {
  printf "$command\n\n"
}
funWebpack () {
  funPstr
  funPcommand
  eval $command
}

str="📦  开始准备打包"
funPstr


# str="📦  打包 moment 国际化模块 不优化"
# command="webpack --config webpack.ignore2.config.js"
# funWebpack
# str="📦  打包 moment 国际化模块 优化 IgnorePlugin"
# command="webpack --config webpack.ignore.config.js"
# funWebpack


# str="📦  打包 lodash 大模块 不优化"
# command="webpack --config webpack.lodash2.config.js"
# funWebpack
# str="📦  打包 lodash 大模块 优化 按需引入"
# command="webpack --config webpack.lodash.config.js"
# funWebpack


# str="📦  打包 react框架 模块 不优化"
# command="webpack --config webpack.dll2.config.js"
# funWebpack
# str="📦  打包 react框架 模块 优化 1、DllPlugin 构建出，配置文件(dll 文件夹)"
# command="webpack --config webpack.dll.config.js"
# funWebpack
# str="📦  打包 react框架 模块 优化 2、DllReferencePlugin 基于配置文件"
# command="webpack --config webpack.dllref.config.js"
# funWebpack


# str="📦  打包 jquery库 模块 不优化"
# command="webpack --config webpack.externals2.config.js"
# funWebpack
# str="📦  打包 jquery库 模块 优化 externals"
# command="webpack --config webpack.externals.config.js"
# funWebpack

# str="📦  打包 jquery库 模块 不优化"
# command="webpack --config webpack.inexclude2.config.js"
# funWebpack
# str="📦  打包 jquery库 模块 优化 exclude"
# command="webpack --config webpack.inexclude.config.js"
# funWebpack
# str="📦  打包 jquery库 模块 优化 noparse + exclude"
# command="webpack --config webpack.noparse.config.js"
# funWebpack
# str="📦  打包 jquery库 模块 优化 source-map 不关闭"
# command="webpack --config webpack.sourceMap.config.js"
# funWebpack

# str="📦  打包 ts 模块 不优化 ts-loader (888ms)"
# command="webpack --config webpack.ts2.config.js"
# funWebpack
# str="📦  打包 ts 模块 优化 ts-loader (351ms)"
# command="webpack --config webpack.ts.config.js"
# funWebpack
# str="📦  打包 ts 模块 优化 babel-loader (545ms) 关闭 fork-ts-checker-webpack-plugin"
# command="webpack --config webpack.tsb2.config.js"
# funWebpack
# str="📦  打包 ts 模块 不优化 babel-loader fork-ts-checker-webpack-plugin (1071ms)"
# command="webpack --config webpack.tsb.config.js"
# funWebpack


# str="📦  打包 模块众多的大型项目 模块 不优化 (2125ms)"
# command="webpack --config webpack.resolve2.config.js"
# funWebpack
# str="📦  打包 模块众多的大型项目 模块 优化 resolve (指定查找模块)(1568ms)"
# command="webpack --config webpack.resolve.config.js"
# funWebpack



str="📦  打包 需并行构建 模块 不优化 ()"
command="webpack --config webpack.thread2.config.js"
funWebpack
# str="📦  打包 需并行构建 模块 优化 thread-loader ()"
# command="webpack --config webpack.thread.config.js"
# funWebpack


str="🎉 打包完成了，看看结果吧!"
funPstr