import { /* refreshCallback, */ credentialsError } from './'

import {
  refreshClientData,
  refreshCustomers,
  refreshServices,
  refreshTickets
} from '../../controllers/actions'

export function credentialCallback (event) {
  const { status, action } = event.data
  if (action !== 'credentials') return console.log('credentialCallback not removed')

  event.stopImmediatePropagation()

  if (status !== 200) return credentialsError()

  window[Symbol.for('rsp.worker')].removeEventListener('message', credentialCallback)
  // window[Symbol.for('rsp.worker')].addEventListener('message', refreshCallback)

  refreshClientData()
  refreshCustomers()
  refreshServices()
  refreshTickets()
}
