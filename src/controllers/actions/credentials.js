export const credentials = function (event) {
  if (!event.data.credentials) return

  const { $apiSecret, $apiKey, $apiHost, $adminKey, $adminCredentials } = window[Symbol.for('vue.prototype')]

  window[Symbol.for('vue.prototype')].sendMessageToWorker({
    route: 'rsp',
    action: 'credentials',
    credentials: event.data.credentials,
    host: $apiHost(),
    key: $apiKey(),
    secret: $apiSecret(),
    adminKey: $adminKey(),
    adminCred: $adminCredentials()
  })
}
