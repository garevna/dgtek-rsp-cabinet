import { eventsTable } from '@/controllers/events-table'
import { rsp } from '@/controllers/events'

const [route, action] = ['rsp', 'password']

export const updateClientCredentials = function (data, callback) {
  const { login, phoneNumber, password } = data
  if (!login || !phoneNumber || !password) {
    window[Symbol.for('vue.instance')].$root.$emit('open-error-popup', {
      errorType: 'Update partner\' credentials',
      ErrorMessage: 'Invalid data. User login, phone and password required.'
    })
    return
  }

  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route,
    action,
    data: { login, phoneNumber, password }
  })

  eventsTable[rsp[action]] = callback
}
