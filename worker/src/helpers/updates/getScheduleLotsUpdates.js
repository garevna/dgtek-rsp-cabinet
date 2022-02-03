const [route, action] = ['updates', 'schedule']

export const getScheduleLotsUpdates = async (notifications) => {
  if (!notifications || !Array.isArray(notifications)) return { status: 204, route, action, result: [] }

  const updates = notifications.filter(item => item.target === 'schedule')

  if (updates?.length) await self.controller.getFreeLotsForSchedule()

  return { status: 200, route, action, result: updates }
}
