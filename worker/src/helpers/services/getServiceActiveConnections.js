import { searchActiveConnections } from '../db'

const [route, action] = ['services', 'active']

export const getServiceActiveConnections = async function (serviceId) {
  const response = await searchActiveConnections(serviceId)

  if (response.status !== 200) return Object.assign(response, { route, action })

  return { status: 200, route, action, result: response.result }
}
