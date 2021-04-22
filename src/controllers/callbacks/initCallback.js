import { initError, credentialCallback } from './'
import { credentials } from '@/controllers/actions'

export function initCallback (event) {
  const { status, action } = event.data
  if (action !== 'init') return console.log('initCallback not removed')
  event.stopImmediatePropagation()
  if (status === 200) {
    credentials()
    window[Symbol.for('rsp.worker')].removeEventListener('message', initCallback)
    window[Symbol.for('rsp.worker')].addEventListener('message', credentialCallback)
  } else initError()
}
