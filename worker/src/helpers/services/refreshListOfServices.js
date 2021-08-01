import { get } from '../AJAX'
import { clearStore, putRecordByKey } from '../db'

import { servicesInfoHandler } from '../../data-handlers'

import { idHandler } from '../env'

const { refreshServicesListError /*, putServicesListError */ } = require('../error-handlers').default

const [route, action] = ['services', 'refresh']

export const refreshListOfServices = async function () {
  const response = await get('service')

  if (response.status !== 200) return refreshServicesListError(status)

  clearStore('services')

  const promises = response.result
    .map(service => putRecordByKey('services', service._id, service))

  const res = await Promise.all(promises)

  res.map(response => response.result)
    .forEach(service => servicesInfoHandler('set-service-data', service._id, { serviceName: service.serviceName, subscriptionFee: service.subscriptionFee }))

  return {
    status: 200,
    route,
    action,
    result: res.map(response => response.result)
      .filter(service => service.partners ? service.partners.includes(idHandler()) : false)
  }
}
