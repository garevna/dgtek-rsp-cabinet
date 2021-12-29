export function updatesCallback (event) {
  const { customers, tickets } = event.data.result

  if (customers) {
    window[Symbol.for('vue.instance')].$emit('customers-updated-remotely')
  }
  if (tickets) {
    window[Symbol.for('vue.instance')].$emit('tickets-updated-remotely')
  }
}
