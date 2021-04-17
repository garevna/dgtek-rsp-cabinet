import { putRecordByKey } from '../db'
import { post } from '../AJAX'

export const updateCustomer = async function (id, data) {
  const [route, action] = ['customers', 'update']
  const { status, result } = await putRecordByKey('customers', id, data)
  if (status !== 200) return { status, route, action, key: id, result }
  const response = await post(`customer/${id}`, Object.assign(data, { _id: id }))
  return Object.assign(response, { route, action })
}
