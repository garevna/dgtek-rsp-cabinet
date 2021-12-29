// import { refreshMessages } from '../dashboard'

const [route, action] = ['updates', 'messages']

export const getMessageUpdates = async function () {
  const { result } = await self.controller.refreshMessages()
  return { status: 200, route, action, result }
}
