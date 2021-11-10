export const customerHandler = (function () {
  let customer = null
  return function (value) {
    if (!value) return customer
    if (value === 'reset') {
      customer = null
    } else {
      customer = JSON.parse(JSON.stringify(value))
    }
  }
})()
