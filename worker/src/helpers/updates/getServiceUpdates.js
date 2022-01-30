import { get } from '../AJAX'
import { putRecordByKey } from '../db'

const [route, action] = ['updates', 'services']

export const getServiceUpdates = async (notifications) => {
  if (!notifications || !Array.isArray(notifications)) return { status: 204, route, action, result: [] }

  let promises = notifications
    .filter(item => item.target === 'service')
    .map(note => note.id)
    .map(id => get(`service/${id}`))

  const responses = await Promise.all(promises)

  const services = responses.map(response => response.result)

  promises = services.map(service => putRecordByKey('services', service._id, service))

  await Promise.all(promises)

  return { status: 200, route, action, result: services }
}
