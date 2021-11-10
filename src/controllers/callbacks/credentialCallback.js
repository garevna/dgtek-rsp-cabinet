import { credentialsError } from './'

import { partnerUniqueCodeHandler } from '../../helpers/data-handlers'

import { actions } from '@/controllers/actions'

const {
  refreshSettings,
  refreshCustomers,
  refreshServices,
  refreshTickets,
  refreshMessages
} = actions

export function credentialCallback (event) {
  const { status } = event.data

  partnerUniqueCodeHandler(event.data.result.uniqueCode)

  window[Symbol.for('vue.prototype')].$refreshed.rsp = true
  window[Symbol.for('vue.instance')].$root.$emit('data-refreshed', { route: 'rsp' })

  if (status === 200) {
    refreshSettings()
    refreshCustomers()
    refreshServices()
    refreshTickets()
    refreshMessages()
  } else credentialsError()
}
