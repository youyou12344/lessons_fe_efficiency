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


str="📦  打包 Split Chunks 不优化"
command="webpack --config webpack.split2.config.js"
funWebpack

str="📦  打包 Split Chunks 优化 async"
command="webpack --config webpack.split2.config.js"
funWebpack

str="📦  打包 Split Chunks 优化 all"
command="webpack --config webpack.split.config.js"
funWebpack


str="🎉 打包完成了，看看结果吧!"
funPstr