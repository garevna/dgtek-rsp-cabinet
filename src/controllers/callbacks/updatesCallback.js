import { messagesHandler } from '../../helpers/data-handlers'

const updateMessages = function ({ result }) {
  console.log('RECEIVED MESSAGES:\n', result.messages)
  messagesHandler(result.messages)
  console.log('MESSAGES HANDLER:\n', messagesHandler())
}

const updatesKeys = [
  'customers',
  'tickets',
  'messages',
  'services'
]

const updates = {
  customers: [],
  tickets: [],
  messages: [],
  services: []
}

export function updatesCallback (event) {
  event.stopPropagation()
  const { status, route, action, ...data } = event.data

  Object.assign(updates, ...updatesKeys.map(key => data.result[key]))

  updateMessages(data)

  updatesKeys
    .forEach(name => window[Symbol.for('vue.instance')].$emit(`${name}-updates-received`, updates[name].result))
}
