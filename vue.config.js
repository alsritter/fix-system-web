module.exports = {
  // 这个文档的配置参考官网：https://cli.vuejs.org/zh/config
  // 以及：https://cloud.tencent.com/developer/article/1408217
  css: {
    loaderOptions: {
      css: {
        // 这里的选项会传递给 css-loader
        // 给 less-loader 传递 Less.js 相关选项
        // less: {
        //   test: /\.less$/,
        //   loader: 'style-loader!css-loader!less-loader'
        // }
      }
    }
  }
}
