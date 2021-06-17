import { credentialsError } from './'

import {
  refreshCustomers,
  refreshServices,
  refreshTickets
} from '@/controllers/actions'

export function credentialCallback (event) {
  const { status } = event.data

  window[Symbol.for('vue.prototype')].$refreshed.rsp = true
  window[Symbol.for('vue.instance')].$root.$emit('data-refreshed', { route: 'rsp' })

  if (status === 200) {
    refreshCustomers()
    refreshServices()
    refreshTickets()
  } else credentialsError()
}
