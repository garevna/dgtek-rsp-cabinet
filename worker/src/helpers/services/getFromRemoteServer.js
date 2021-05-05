import { get } from '../AJAX'
import { putRecordByKey } from '../db'
import { refreshServicesListError } from '../error-handlers'

const route = 'services'

export const getFromRemoteServer = async function () {
  const action = 'refresh'
  const response = await get('service')

  if (response.status !== 200) return refreshServicesListError(status)

  for (const service of response.result) {
    await putRecordByKey('services', service._id, service)
  }

  return Object.assign(response, { route, action })
}
