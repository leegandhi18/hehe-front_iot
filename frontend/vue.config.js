const { VUE_APP_SERVER } = process.env

module.exports = {
  runtimeCompiler: true,
  devServer: {
    proxy: {
      '/serverApi': {
        target: VUE_APP_SERVER,
        changeOrigin: true,
        pathRewrite: {
          '^/serverApi': ''
        }
      }
    }
  }
}
