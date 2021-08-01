import { get } from '../AJAX'
import { clearStore, putRecordByKey } from '../db'

import { servicesInfoHandler, partnerUniqueCodeHandler } from '../../data-handlers'

const updateCode = code => `${partnerUniqueCodeHandler()}${code.slice(2)}`

const { refreshCustomersListError } = require('../error-handlers').default

export const refreshCustomers = async function () {
  const [route, action] = ['customers', 'refresh']
  let currentPage = 1
  let done = false
  servicesInfoHandler('reset')
  clearStore('customers')

  while (!done) {
    const { status, result, pages } = await get(`customer/rsp?page=${currentPage}`)
    if (status !== 200) return refreshCustomersListError(status)

    done = currentPage++ >= pages

    const promises = result
      .map(customer => putRecordByKey('customers', customer._id, Object.assign(customer, { uniqueCode: updateCode(customer.uniqueCode) })))
    const res = (await Promise.all(promises)).map(response => response.result)

    self.controller.calculations(res)
  }

  self.postMessage({ status: 200, route: 'dashboard', action: 'info', result: servicesInfoHandler() })

  return { status: 200, route, action, result: (await self.controller.getAllCustomers()).result }
}
