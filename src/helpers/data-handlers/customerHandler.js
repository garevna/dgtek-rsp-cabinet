export const customerHandler = (function () {
  let customer = null
  return function (value) {
    if (!value) return customer
    if (value === 'reset') {
      customer = null
    } else {
      customer = Object.assign(JSON.parse(JSON.stringify(value)), {
        customerCreationDate: value.customerCreationDate || new Date().toISOString().slice(0, 10)
      })
    }
  }
})()
