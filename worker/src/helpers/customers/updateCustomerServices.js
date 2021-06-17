import { getRecordByKey, putRecordByKey } from '../db'

import { put } from '../AJAX'

const {
  getCustomerDataError,
  putCustomerDataError
} = require('../error-handlers').default

export const updateCustomerServices = async function (id, data) {
  const [route, action] = ['customers', 'services']

  const { status: getStatus, result: getResult } = await getRecordByKey('customers', id)

  if (getStatus !== 200) return getCustomerDataError(getStatus)

  const response = Object.assign({}, getResult, { services: data })

  const { status: putStatus } = await putRecordByKey('customers', id, response)

  if (putStatus !== 200) return putCustomerDataError(putStatus)

  const { status, result } = await put(`customer/${id}`, response)

  if (status !== 200) return putCustomerDataError(status, result)

  const customer = result.data

  if (customer.services.length) {
    const { status: serviceStatus, result: service } = await getRecordByKey('services', customer.services[0].id)
    if (serviceStatus === 200) {
      Object.assign(customer, {
        serviceSpeed: `${service.upstreamSpeed}/${service.downstreamSpeed}`,
        serviceStatus: customer.services[0].status,
        servicePlan: service.subscriptionFee,
        serviceTerm: service.contractTerm
      })
    }
  }

  return {
    status,
    route,
    action,
    result: customer
  }
}
