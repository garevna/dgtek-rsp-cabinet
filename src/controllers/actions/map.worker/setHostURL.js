export const setHostURL = function (url) {
  window[Symbol.for('vue.instance')].$root.$emit('progress-event', true)
  window[Symbol.for('map.worker')].postMessage({ action: 'host', key: url })
}
