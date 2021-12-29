import { patch } from '../AJAX'

const { patchTicketDataError } = require('../error-handlers').default

const [route, action] = ['tickets', 'history']

export const patchTicketHistory = async function (key, history) {
  self.postDebugMessage({ key, history })

  const { status, result } = await patch(`ticket/${key}`, { history })

  if (status !== 200) return patchTicketDataError(status)

  return {
    status,
    route,
    action,
    result
  }
}
