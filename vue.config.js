const path = require('path')

const port = 9527
const title = '小蜜蜂医疗'

function resolve(dir) {
  return path.resolve(__dirname, dir)
}

module.exports = {
  // 打包成 APP production 使用 './', 部署在服务器 production 使用 '/'
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  outputDir: 'dist',
  lintOnSave: process.env.NODE_ENV !== 'production',
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true,
    disableHostCheck: true,
    overlay: {
      warnings: false,
      errors: true
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  chainWebpack: (config) => {
    config.plugins.delete('prefetch')
    config.plugin('html').tap(options => {
      options[0].title = title
      return options
    })
  },
  css: {
    loaderOptions: {
      less: {
        // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
        lessOptions: {
          modifyVars: {
            // 直接覆盖变量
            // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
            hack: 'true; @import "@/styles/variables.less";'
          }
        }
      }
    }
  }
}
