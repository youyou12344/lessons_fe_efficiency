// 编译阶段/时间分析工具/webpack插件, 实现了：
// 1、 构建单个模块 耗时
// 2、 构建过程 累计总耗时
const chalk = require('chalk')

const PluginName = 'WebpackTimingPlugin'

class WebpackTimingPlugin {
  // 一个 `Webpack 插件` 是一个包含 `apply` 方法的 JavaScript 对象。
  apply(compiler) {
    const applyStart = Date.now()
    const moduleTimings = new Map()
    const getModulePath = (module) =>
      module.identifier().substr(__dirname.length + 1)

    // 在运行构建过程中触发 compiler.hooks.compilation
    compiler.hooks.compilation.tap(PluginName, (compilation, params) => {
      // 在构建单个模块时触发/开始 compilation.hooks.buildModule
      compilation.hooks.buildModule.tap(PluginName, (module) => {
        const modulePath = getModulePath(module)
        moduleTimings[modulePath] = Date.now()
      })

      // 在构建单个模块时触发/完成 compilation.hooks.succeedModule
      compilation.hooks.succeedModule.tap(PluginName, (module) => {
        const modulePath = getModulePath(module)
        const moduleStart = moduleTimings[modulePath]
        console.log(
          'Build 构建单个模块',
          modulePath,
          '耗时: ',
          `${chalk.red(Date.now() - moduleStart)}ms `,
          `累计总耗时: ${Date.now() - applyStart}ms`
        )
      })
    })
  }
}

module.exports = WebpackTimingPlugin
