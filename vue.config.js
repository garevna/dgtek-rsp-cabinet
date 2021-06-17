module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  publicPath: process.env.NODE_ENV === 'production' ? '/reseller-cabinet/' : '/',
  runtimeCompiler: true
}
