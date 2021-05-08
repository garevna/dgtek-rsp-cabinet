import { put } from '../AJAX'
import {
  putTicketDataError,
  refreshTicketsListError,
  getTicketsListError
} from '../error-handlers'

import {
  getFromRemoteServer,
  getFromLocalDb,
  getDateNumber
} from './'

export const putTicketData = async function (key, data) {
  const route = 'tickets'
  const { _id } = data

  data.created = getDateNumber(data.created).toString()
  data.modified = Date.now().toString()

  const { status } = await put(`ticket/${_id}`, data)

  if (status !== 200) return putTicketDataError(status)

  const { status: refreshStatus } = await getFromRemoteServer()

  if (refreshStatus !== 200) return refreshTicketsListError(refreshStatus)

  const { status: getStatus, result: getResult } = await getFromLocalDb()

  if (getStatus !== 200) return getTicketsListError(getStatus)

  return {
    status,
    route,
    action: 'list',
    result: getResult,
    message: true,
    messageType: 'Ticket details',
    messageText: 'Ticket details updated'
  }
}
