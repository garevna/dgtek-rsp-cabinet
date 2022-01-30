import { get } from '../AJAX'

const [route, action] = ['updates', 'message']

// const remoteError = Object.assign(remoteServerError, { route, action })

export const getMessageUpdates = async (notifications) => {
  if (!notifications || !Array.isArray(notifications)) return { status: 204, route, action, result: [] }

  const promises = notifications
    .filter(item => item.target === 'message')
    .map(note => note.id)
    .map(id => get(`messages/${id}`))

  const responses = await Promise.all(promises)

  const messages = responses.map(response => response.result)

  return { status: 200, route, action, result: messages }
}
