const webpack = require('webpack');
const BrotliPlugin = require('brotli-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  configureWebpack: {
    plugins: [
      // new BundleAnalyzerPlugin(),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new BrotliPlugin({
        asset: '[path].br[query]',
        test: /\.(js|css|html|svg)$/,
        threshold: 10240,
        minRatio: 0.7
      })
    ],
    resolve: {
      alias: {
        '@': __dirname + '/src'
      }
    }
  },
  css: {
    sourceMap: true,
    loaderOptions: {
      sass: {
        data: `
          @import "@/assets/scss/_variables.scss";
          @import "@/assets/scss/mixins/_border-radius.scss";
          @import "@/assets/scss/mixins/_box-shadow.scss";
          @import "@/assets/scss/mixins/_opacity.scss";
          @import "@/assets/scss/mixins/_placeholder.scss";
          @import "@/assets/scss/mixins/_responsive.scss";
          @import "@/assets/scss/mixins/_transform.scss";
          @import "@/assets/scss/mixins/_transition.scss";
          @import "@/assets/scss/mixins/_extend.scss";
        `
      }
    },
  },
  productionSourceMap: false
}
