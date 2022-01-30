import {
  hostHandler,
  adminKeyHandler,
  adminCredHandler
} from '../env'

const [route, action] = ['updates', 'notify']

export const sendNotification = async (target, id, details = '') => {
  const date = new Date().toISOString().slice(0, 10)

  const storage = await (await fetch(`${hostHandler()}/local-storage`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: adminKeyHandler(),
      Credentials: adminCredHandler()
    }
  })).json()

  const item = storage.data[date] || []

  item.push({
    created: Date.now(),
    target,
    id,
    details
  })

  const response = await fetch(`${hostHandler()}/local-storage`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: adminKeyHandler(),
      Credentials: adminCredHandler()
    },
    body: JSON.stringify({ [date]: item })
  })

  return { status: response.status, route, action, result: await response.json() }
}
