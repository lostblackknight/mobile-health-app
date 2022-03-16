const path = require('path')

const port = 9527
const title = '小蜜蜂医疗'

function resolve(dir) {
  return path.resolve(__dirname, dir)
}

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  outputDir: 'dist',
  lintOnSave: process.env.NODE_ENV !== 'production',
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true,
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
      sass: {
        prependData: '@import "~@/styles/variables.sass"'
      }
    }
  }
}
