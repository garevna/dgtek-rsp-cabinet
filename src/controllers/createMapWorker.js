import { startWorker } from 'dgtek-portal-map-package/dist/start-worker'

import { refreshCallback } from './callbacks'

window.addEventListener('dgtek-portal-map-package-error', function (event) {
  console.warn(event)
})

const callback = () => {
  refreshCallback({
    data: {
      status: 200,
      route: 'footprint',
      action: 'refresh'
    }
  })
}

export const createMapWorker = function () {
  const path = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_PUBLIC_PATH_PRODUCTION : ''

  const { $apiHost, $apiKey, $adminCredentials } = window[Symbol.for('vue.prototype')]

  window[Symbol.for('map.worker')] = startWorker(path, $apiHost(), $apiKey(), $adminCredentials(), 'RSP', callback)
}
