export const serviceHandler = (function () {
  let serviceId = null
  let serviceName = ''
  return function (id, name) {
    if (!id && !name) return { serviceId, serviceName }
    if (id === 'reset' || name === 'reset') {
      serviceId = null
      serviceName = ''
    } else {
      serviceId = id
      serviceName = name
    }
  }
})()
