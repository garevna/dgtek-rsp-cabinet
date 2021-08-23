import { post, get, patch } from '../AJAX'

import { putRecordByKey } from '../db'

import { getTicketNumber } from './getTicketNumber'
// import { getShortTicketInfo } from './getShortTicketInfo'

const {
  postNewTicketError,
  patchTicketDataError,
  putTicketToLocalDBError
} = require('../error-handlers').default

export const postNewTicket = async function (data) {
  const { data: ticket } = data

  // ticket.created = Date.now().toString()
  // ticket.modified = Date.now().toString()

  const { status, result } = await post('ticket', ticket)

  if (status !== 200) return postNewTicketError(status)

  const response = await get(`ticket/${result.data}`)

  if (response.status !== 200) return postNewTicketError(response.status)

  const res = await patch(`ticket/${result.data}`, { number: getTicketNumber(response.result) })

  if (res.status !== 200) return patchTicketDataError(res.status)

  const tmp = await putRecordByKey('tickets', result.data, res.result.data)

  if (tmp.status !== 200) return putTicketToLocalDBError(tmp.status)

  const created = new Date().toISOString().slice(0, 10)
  const modified = new Date().toISOString().slice(0, 10)

  self.postMessage({
    status: 200,
    route: 'tickets',
    action: 'post',
    result: Object.assign(res.result.data, { created, modified }),
    message: true,
    messageType: 'Tickets',
    messageText: `New ticket ${res.result.data.number} has been created`
  })
}
