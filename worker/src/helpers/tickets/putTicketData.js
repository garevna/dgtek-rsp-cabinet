import { post } from '../AJAX'
import { postNewTicketError } from '../error-handlers'
import { putRecordByKey } from '../db'

export const postNewTicket = async function (id, data) {
  const { status, result } = await post(`ticket/${id}`, data)
  if (status !== 200) return postNewTicketError(status)
  const { status: localStatus } = await putRecordByKey(id, data)
  if (localStatus !== 200) return postNewTicketError(status)
  return { status, route: 'tickets', action: 'post', key: id, result }
}
