import { put } from '../AJAX'
import { putTicketDataError, refreshTicketsListError } from '../error-handlers'
import { getFromRemoteServer, getDateNumber } from './'

export const putTicketData = async function (key, data) {
  const [route, action] = ['tickets', 'put']
  const { _id } = data

  data.created = getDateNumber(data.created).toString()
  data.modified = Date.now().toString()

  self.postMessage({ status: 300, route, action, result: { key: _id, data } })

  const { status, result } = await put(`ticket/${_id}`, data)

  if (status !== 200) return putTicketDataError(status)

  const { status: refreshStatus } = await getFromRemoteServer()

  if (refreshStatus !== 200) return refreshTicketsListError(status)

  return {
    status,
    route,
    action,
    key: _id,
    result,
    message: true,
    messageType: 'Ticket details',
    messageText: 'Ticket details updated'
  }
}
