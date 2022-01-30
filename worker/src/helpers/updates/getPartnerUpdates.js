import { get } from '../AJAX'
import { putRecordByKey } from '../db'

// const { refreshCustomersListError } = require('../error-handlers').default

const [route, action] = ['updates', 'rsp']

export const getPartnerUpdates = async function (notifications) {
  if (!notifications || !Array.isArray(notifications)) return { status: 204, route, action, result: [] }

  let promises = notifications
    .filter(item => item.target === 'partner')
    .map(note => note.id)
    .map(id => get(`user/${id}`))

  const responses = await Promise.all(promises)

  const partners = responses.map(response => response.result)

  promises = partners
    .map((partner) => putRecordByKey('rsp', partner._id, partner))

  await Promise.all(promises)

  return { status: 200, route, action, result: partners }
}
