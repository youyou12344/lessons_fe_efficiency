// 打包阶段 时间分析
const chalk = require('chalk')

const PluginName = 'TimingPlugin'

class WebpackTiming {
  apply(compiler) {
    const applyStart = Date.now()
    let afterCompileStart
    compiler.hooks.afterCompile.tap(PluginName, () => {
      afterCompileStart = Date.now()
    })
    compiler.hooks.done.tap(PluginName, () => {
      console.log(
        'after Compile Time',
        `${chalk.magentaBright(Date.now() - afterCompileStart)}ms, `,
        `build duration: ${Date.now() - applyStart}ms`
      )
    })
    compiler.hooks.compilation.tap(PluginName, (compilation) => {
      // 优化阶段可以细分为 12 个子任务
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
        compilation.hooks[start].tap(PluginName, () => {
          startTime = Date.now()
        })
        compilation.hooks[end].tap(PluginName, () => {
          const cost = Date.now() - startTime
          // if (cost < 10) {
          //   return
          // }
          console.log(
            `[Step ${name}] costs: ${chalk.red(cost)}ms, `,
            `build duration: ${Date.now() - applyStart}ms`
          )
        })
      })
    })
  }
}

module.exports = WebpackTiming