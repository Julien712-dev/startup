const path = require('path')
const mix = require('laravel-mix')
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const CleanWebpackPlugin = require('clean-webpack-plugin')

mix
  .js('resources/js/app.js', 'public/js')
  .sass('resources/sass/app.scss', 'public/css')

  .sourceMaps()
  .disableNotifications()

if (mix.inProduction()) {
  mix.webpackConfig({
    plugins: [
      new CleanWebpackPlugin({
        // dry: true,
        // verbose: true,
        cleanOnceBeforeBuildPatterns: [
          'css/*',
          'js/*'
        ]
      })
    ]
  })
  // Disabled until resolved: https://github.com/JeffreyWay/laravel-mix/issues/1889
  // mix.extract()
  mix.version()
}

mix.webpackConfig({
  plugins: [
    // new BundleAnalyzerPlugin()
  ],
  resolve: {
    extensions: ['.js', '.json', '.vue'],
    alias: {
      '~': path.join(__dirname, './resources/js')
    }
  },
  output: {
    chunkFilename: 'js/[name].[chunkhash].js',
    publicPath: mix.config.hmr ? '//localhost:8080' : '/'
  }
})
