module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  publicPath: process.env.NODE_ENV === 'production' ? '/dgtek-portal-rsp/' : '/',
  runtimeCompiler: true
}
