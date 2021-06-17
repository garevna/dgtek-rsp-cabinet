import { get } from '../AJAX'
import { putRecordByKey } from '../db'

import { servicesInfoHandler } from '../../data-handlers'

const { refreshServicesListError /*, putServicesListError */ } = require('../error-handlers').default

const route = 'services'

export const refreshListOfServices = async function () {
  const action = 'refresh'
  const response = await get('service')

  if (response.status !== 200) return refreshServicesListError(status)

  const promises = response.result.map(service => putRecordByKey('services', service._id, service))

  const res = await Promise.all(promises)

  // self.postMessage({ status: 300, message: 'SERVICES SAVED TO LOCAL DB', res })

  res.map(response => response.result)
    .forEach(service => servicesInfoHandler('set-service-data', service._id, { serviceName: service.serviceName, subscriptionFee: service.subscriptionFee }))

  // self.postMessage({ status: 300, servicesInfo: servicesInfoHandler() })

  return Object.assign({ status: 200, route, action, result: res.map(response => response.result) })
}
