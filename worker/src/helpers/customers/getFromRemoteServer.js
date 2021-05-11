import { get } from '../AJAX'
import { clearStore, putRecordByKey } from '../db'
import { refreshCustomersListError } from '../error-handlers'

export const getFromRemoteServer = async function () {
  const [route, action] = ['customers', 'refresh']
  const { status, result } = await get('customer')

  // self.postMessage({ status: 300, route, action, response: { status, result } })

  if (status !== 200) return refreshCustomersListError(status)

  clearStore('customers')

  for (const customer of result) {
    const { _id } = customer
    const { status } = await putRecordByKey('customers', _id, customer)
    if (status !== 200) return refreshCustomersListError(status)
  }
  return { status: 200, route, action, result }
}
