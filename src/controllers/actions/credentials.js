export const credentials = function (creds) {
  if (!creds) return

  const { $apiSecret, $apiKey, $apiHost, $adminKey, $adminCredentials } = window[Symbol.for('vue.prototype')]

  window[Symbol.for('vue.prototype')].sendMessageToWorker({
    route: 'rsp',
    action: 'credentials',
    credentials: creds,
    host: $apiHost(),
    key: $apiKey(),
    secret: $apiSecret(),
    adminKey: $adminKey(),
    adminCred: $adminCredentials()
  })
}
