import { refreshError } from './'

export function refreshCallback (event) {
  const { status, route, action, result } = event.data

  if (action !== 'refresh') return

  if (status !== 200 && status !== 300) return refreshError(route)

  window[Symbol.for('vue.prototype')].__commit('SET_REFRESHED', { route, status: true })

  console.log('REFRESH CALLBACK:\n', status, route, action, result)
  // window[Symbol.for('vue.prototype')].__commit(`${route}/SET_STATE_DATA`, result)
}
