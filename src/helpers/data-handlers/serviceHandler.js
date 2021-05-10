export const serviceHandler = (function () {
  let serviceId = ''
  let serviceName = ''
  let serviceSpeed = ''
  let serviceStatus = ''
  let servicePlan = ''
  let serviceTerm = ''

  return function (data) {
    if (!data) {
      return {
        serviceId,
        serviceName,
        serviceSpeed,
        serviceStatus,
        servicePlan,
        serviceTerm
      }
    }
    if (data === 'reset') {
      serviceId = ''
      serviceName = ''
      serviceSpeed = ''
      serviceStatus = ''
      servicePlan = ''
      serviceTerm = ''
    } else {
      serviceId = data.serviceId || serviceId
      serviceName = data.serviceName || serviceName
      serviceSpeed = data.serviceSpeed || serviceSpeed
      serviceStatus = data.serviceStatus || serviceStatus
      servicePlan = data.servicePlan || servicePlan
      serviceTerm = data.serviceTerm || serviceTerm

      console.log(serviceId)
      console.log(serviceName)
      console.log(serviceSpeed)
      console.log(serviceStatus)
      console.log(servicePlan)
      console.log(serviceTerm)
    }
  }
})()
