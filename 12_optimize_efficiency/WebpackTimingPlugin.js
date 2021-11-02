// 打包阶段/时间分析工具/webpack插件
const chalk = require('chalk')

const PluginName = 'TimingPlugin'

class WebpackTiming {
  // 一个 `Webpack 插件` 是一个包含 `apply` 方法的 JavaScript 对象。
  apply(compiler) {
    const applyStart = Date.now()
    let afterCompileStart

    // 在运行构建过程中触发 compiler.hooks.afterCompile
    compiler.hooks.afterCompile.tap(PluginName, () => {
      afterCompileStart = Date.now()
    })

    // 在达到最终结果状态时触发 compiler.hooks.done
    compiler.hooks.done.tap(PluginName, () => {
      console.log(
        'after Compile Time (编译耗时?):',
        `${chalk.magentaBright(Date.now() - afterCompileStart)}ms, `,
        `打包总耗时: ${Date.now() - applyStart}ms`
      )
    })

    // 在运行构建过程中触发 compiler.hooks.compilation
    compiler.hooks.compilation.tap(PluginName, (compilation) => {
      // Webpack 优化阶段在 `seal 函数` (构建/冻结/优化/提交产物) 中共有 12 个主要的处理过程
      const lifeHooks = [{
          name: 'optimizeDependencies',
          nameZh: '优化 依赖项',
          start: 'optimizeDependencies',
          end: 'afterOptimizeDependencies',
        },
        {
          name: 'createChunks',
          nameZh: '生成 Chunk',
          start: 'beforeChunks',
          end: 'afterChunks'
        },
        {
          name: 'optimizeModules',
          nameZh: '优化 Module',
          start: 'optimize',
          end: 'optimizeChunks'
        },
        {
          name: 'optimizeChunks',
          nameZh: '优化 Chunk',
          start: 'optimizeChunks',
          end: 'afterOptimizeChunks',
        },
        {
          name: 'optimizeTree',
          nameZh: '优化 Tree',
          start: 'optimizeTree',
          end: 'afterOptimizeTree',
        },
        {
          name: 'optimizeChunkModules',
          nameZh: '优化 ChunkModules',
          start: 'optimizeChunkModules',
          end: 'afterOptimizeChunkModules',
        },
        {
          name: 'moduleIds',
          nameZh: '生成 Module Ids',
          start: 'beforeModuleIds',
          end: 'afterOptimizeModuleIds',
        },
        {
          name: 'chunkIds',
          nameZh: '生成 Chunk Ids',
          start: 'beforeChunkIds',
          end: 'afterOptimizeChunkIds',
        },
        {
          name: 'hash',
          nameZh: '生成 hash',
          start: 'beforeHash',
          end: 'afterHash'
        },
        {
          name: 'moduleAssets',
          nameZh: '生成 ModuleAssets',
          start: 'beforeModuleAssets',
          end: 'shouldGenerateChunkAssets',
        },
        {
          name: 'chunkAssets',
          nameZh: '生成 ChunkAssets',
          start: 'beforeChunkAssets',
          end: 'additionalAssets',
        },
        {
          name: 'optimizeChunkAssets',
          nameZh: '优化 ChunkAssets',
          start: 'optimizeChunkAssets',
          end: 'afterOptimizeChunkAssets',
        },
        {
          name: 'optimizeAssets',
          nameZh: '优化 Assets',
          start: 'optimizeAssets',
          end: 'afterOptimizeAssets',
        },
      ]

      lifeHooks.forEach(({
        name,
        nameZh,
        start,
        end
      }) => {
        let startTime
        if (!compilation.hooks[start]) {
          console.log('no hooks', start)
        }
        if (!compilation.hooks[end]) {
          console.log('no hooks', end)
        }
        // 优化阶段 开始 触发
        compilation.hooks[start].tap(PluginName, () => {
          startTime = Date.now()
        })
        // 优化阶段 结束 触发
        compilation.hooks[end].tap(PluginName, () => {
          const cost = Date.now() - startTime
          console.log(
            `[阶段 ${name} ${nameZh}] 耗时: ${chalk.red(cost)}ms, `,
            `build duration: ${Date.now() - applyStart}ms`
          )
        })
      })
    })
  }
}

module.exports = WebpackTiming