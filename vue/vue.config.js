module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@': __dirname + '/src'
      }
    },
  },
  css: {
    sourceMap: true
  }
}
