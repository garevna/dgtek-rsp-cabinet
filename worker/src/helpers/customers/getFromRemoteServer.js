import { get } from '../AJAX'
import { clearStore, putRecordByKey } from '../db'
import { refreshCustomersListError } from '../error-handlers'

export const getFromRemoteServer = async function () {
  const [route, action] = ['customers', 'refresh']

  let currentPage = 1
  let done = false
  clearStore('customers')

  while (!done) {
    const { status, result, pages } = await get(`customer/rsp?page=${currentPage}`)
    if (status !== 200) return refreshCustomersListError(status)

    done = currentPage++ >= pages

    for (const customer of result) {
      const { _id } = customer
      const { status } = await putRecordByKey('customers', _id, customer)
      if (status !== 200) return refreshCustomersListError(status)
    }
  }

  return { status: 200, route, action, result: 'OK' }
}
