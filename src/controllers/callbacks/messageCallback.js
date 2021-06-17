export function messageCallback (data) {
  window[Symbol.for('vue.instance')].$root.$emit('open-message-popup', {
    messageType: data.messageType || data.route,
    messageText: data.messageText || 'Success'
  })
}
