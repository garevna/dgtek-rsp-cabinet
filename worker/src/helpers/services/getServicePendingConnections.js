import { searchPendingConnections } from '../db'

const [route, action] = ['services', 'pending']

export const getServicePendingConnections = async function (serviceId) {
  const response = await searchPendingConnections(serviceId)

  if (response.status !== 200) return Object.assign(response, { route, action })

  return { status: 200, route, action, result: response.result }
}
