import { initError } from './'

import {
  refreshCustomers,
  refreshServices,
  refreshTickets,
  refreshMessages
} from '@/controllers/actions'

export function initCallback (event) {
  const { status } = event.data

  window[Symbol.for('vue.prototype')].$refreshed.rsp = true

  if (status === 200) {
    refreshCustomers()
    refreshServices()
    refreshTickets()
    refreshMessages()
  } else initError()
}
