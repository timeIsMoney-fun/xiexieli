const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // 1.配置方式一: CLI提供的属性
  outputDir: './dist',
  // publicPath: './',
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://www.seally.cn/seally-shoes-api',
        pathRewrite: {
          '^/api': ''
        },
        changeOrigin: true
      }
    }
  },
  // 2.配置方式二: 和webpack属性完全一致, 最后会进行合并
  // configureWebpack: {
  //   resolve: {
  //     alias: {
  //       '@': path.resolve(__dirname, 'src'),
  //       components: '@/components'
  //     }
  //   }
  // }
  configureWebpack: (config) => {
    for (const plugin of config.plugins) {
      if (plugin instanceof HtmlWebpackPlugin) {
        plugin.options.title = '鞋鞋理管理平台'
      }
    }
    config.resolve.alias = {
      '@': path.resolve(__dirname, 'src'),
      components: '@/components'
    }
  }
  // 3.配置方式三:
  // chainWebpack: (config) => {
  //   config.resolve.alias
  //     .set('@', path.resolve(__dirname, 'src'))
  //     .set('components', '@/components')
  // }
}
