import * as actions from './actions'

export const createController = function () {
  Object.keys(actions).forEach(key => Object.assign(window[Symbol.for('vue.prototype')], {
    [`__${key}`]: actions[key]
  }))

  // Object.assign(window[Symbol.for('vue.prototype')], {
  // __getBuildingById: function (id) {
  //   window[Symbol.for('vue.instance')].$root.$emit('progress-event', true)
  //   window[Symbol.for('map.worker')].postMessage({ action: 'getById', key: id })
  // },
  // __getBuildingByAddress: function (address) {
  //   window[Symbol.for('vue.instance')].$root.$emit('progress-event', true)
  //   window[Symbol.for('map.worker')].postMessage({ action: 'getByAddress', key: address })
  // },
  // __getLitBuildings: function () {
  //   window[Symbol.for('vue.instance')].$root.$emit('progress-event', true)
  //   window[Symbol.for('map.worker')].postMessage({ action: 'list', key: 'lit' })
  // },
  // __getFootprintBuildings: function () {
  //   window[Symbol.for('vue.instance')].$root.$emit('progress-event', true)
  //   window[Symbol.for('map.worker')].postMessage({ action: 'list', key: 'footprint' })
  // },
  // __putBuildingDetails: function (id, details) {
  //   window[Symbol.for('vue.instance')].$root.$emit('progress-event', true)
  //   window[Symbol.for('map.worker')].postMessage({ action: 'put', key: id, data: details })
  // },
  // __postBuildingDetails: function (details) {
  //   window[Symbol.for('vue.instance')].$root.$emit('progress-event', true)
  //   window[Symbol.for('map.worker')].postMessage({ action: 'post', data: details })
  // }
  // })
}
