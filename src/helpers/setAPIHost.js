export const setAPIHost = function () {
  window.dispatchEvent(new CustomEvent('set-api-host', {
    detail: {
      host: process.env.NODE_ENV === 'production' ? process.env.VUE_APP_BUILDINGS_API_HOST_PROD : process.env.VUE_APP_BUILDINGS_API_HOST_DEV
    }
  }))
}
