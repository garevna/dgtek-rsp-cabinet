import { refreshCallback, credentialsError } from './'
import {
  refreshClientData,
  refreshCustomers,
  refreshServices,
  refreshTickets
} from '../../controllers/actions'

export function credentialCallback (event) {
  const { status, action } = event.data
  if (action !== 'credentials') return /* console.log('credentialCallback not removed') */
  if (status === 200) {
    window[Symbol.for('rsp.worker')].addEventListener('message', refreshCallback)

    refreshClientData()
    refreshCustomers()
    refreshServices()
    refreshTickets()

    window[Symbol.for('rsp.worker')].removeEventListener('message', credentialCallback)
    // window[Symbol.for('vue.prototype')].__refresh()
  } else credentialsError()
}
