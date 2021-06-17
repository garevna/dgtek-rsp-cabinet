import { services } from './services'
import { initRecord } from './initRecord'
import { currentMonth } from './currentMonth'
import { getInfo } from './getInfo'

export const servicesInfoHandler = function (action, serviceId, params) {
  // self.postMessage({ status: 300, services, action, serviceId, params })
  if (action === 'reset') {
    Object.keys(services).forEach(id => {
      services[id].lastMonth = 0
      services[id].active = 0
      services[id].pending = 0
    })
    return
  }

  if (action && serviceId && params && (!Object.keys(services).length || !services[serviceId])) initRecord(serviceId)

  if (action === 'set-service-data') {
    const { serviceName, subscriptionFee: charge } = params

    Object.assign(services[serviceId], { serviceName, charge })

    // return self.postMessage({ status: 300, info: services })
    return
  }

  if (action === 'add-service') {
    const { status, modified } = params

    if (status === 'Active') {
      services[serviceId].active += 1
      if (modified >= currentMonth[0] && modified <= currentMonth[1]) services[serviceId].lastMonth += 1
    }

    if (status === 'In job queue') services[serviceId].pending += 1

    return

    // return self.postMessage({ status: 300, info: services })
  }

  return getInfo()
}
