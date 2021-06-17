export const init = function () {
  const { $apiSecret, $apiKey, $apiHost, $adminKey, $adminCredentials } = window[Symbol.for('vue.prototype')]

  window[Symbol.for('rsp.worker')].postMessage({
    route: 'crypto',
    action: 'init',
    data: {
      host: $apiHost(),
      key: $apiKey(),
      secret: $apiSecret(),
      adminKey: $adminKey(),
      adminCred: $adminCredentials()
    }
  })
}
