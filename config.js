const secretHandler = (() => {
  const secret = process.env.VUE_APP_SECRET
  return () => secret
})()

const apiKeyHandler = (() => {
  const key = process.env.VUE_APP_AUTHORIZATION_KEY
  return () => key
})()

const geoscapeKeyHandler = (() => {
  const key = process.env.VUE_APP_GEOSCAPE_KEY
  return () => key
})()

const buildingsHostHandler = (() => {
  const buildingHost = process.env.VUE_APP_BUILDINGS_API_HOST
  return () => buildingHost
})()

const hostHandler = (() => {
  const host = process.env.VUE_APP_API_HOST
  return () => host
})()

const adminKeyHandler = (() => {
  const key = process.env.VUE_APP_ADMIN_APP_KEY
  return () => key
})()

const adminCredHandler = (() => {
  const cred = process.env.VUE_APP_ADMIN_CREDENTIALS
  return () => cred
})()

const config = {
  apiSecret: secretHandler,
  apiKey: apiKeyHandler,
  apiHost: hostHandler,
  geoscapeKey: geoscapeKeyHandler,
  buildingsHost: buildingsHostHandler,
  adminKey: adminKeyHandler,
  adminCredentials: adminCredHandler
}

export {
  config
}

export default {
  install (Vue) {
    Vue.appConfig = config
    Vue.apiSecret = secretHandler
    Vue.apiKey = apiKeyHandler
    Vue.apiHost = hostHandler
    Vue.geoscapeKey = geoscapeKeyHandler
    Vue.buildingsHost = buildingsHostHandler

    Vue.adminKey = adminKeyHandler
    Vue.adminCredentials = adminCredHandler

    Vue.prototype.$appConfig = config
    Vue.prototype.$apiSecret = secretHandler
    Vue.prototype.$apiKey = apiKeyHandler
    Vue.prototype.$apiHost = hostHandler
    Vue.prototype.$geoscapeKey = geoscapeKeyHandler
    Vue.prototype.$buildingsHost = buildingsHostHandler

    Vue.prototype.$adminKey = adminKeyHandler
    Vue.prototype.$adminCredentials = adminCredHandler
  }
}
