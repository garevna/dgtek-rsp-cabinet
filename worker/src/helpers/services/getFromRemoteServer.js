import { get } from '../AJAX'
import { putRecordByKey } from '../db'
import { refreshServicesListError, putServicesListError } from '../error-handlers'

const route = 'services'

export const getFromRemoteServer = async function () {
  const action = 'refresh'
  const response = await get('service')

  if (response.status !== 200) return refreshServicesListError(status)

  for (const service of response.result) {
    const { _id, ...data } = service
    const { status } = await putRecordByKey('services', service._id, data)
    if (status !== 200) return putServicesListError(status)
  }

  return Object.assign(response, { route, action })
}
