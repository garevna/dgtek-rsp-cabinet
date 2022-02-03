import { messagesHandler } from '../../helpers/data-handlers'

const updateMessages = function (updates) {
  messagesHandler(updates.messages)
}

const updatesKeys = [
  'customers',
  'tickets',
  'messages',
  'services'
]

export function updatesCallback (event) {
  event.stopPropagation()

  const { result: updates } = event.data

  updateMessages(updates)

  updatesKeys
    .forEach(name => window[Symbol.for('vue.instance')].$emit(`${name}-updates-received`, updates[name]))
}
