import { initError } from './'

import {
  refreshCustomers,
  refreshServices,
  refreshTickets
} from '@/controllers/actions'

export function initCallback (event) {
  const { status } = event.data

  window[Symbol.for('vue.prototype')].$refreshed.rsp = true

  if (status === 200) {
    refreshCustomers()
    refreshServices()
    refreshTickets()
  } else initError()
}
