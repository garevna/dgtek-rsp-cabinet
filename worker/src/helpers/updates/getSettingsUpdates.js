const [route, action] = ['updates', 'settings']

export const getSettingsUpdates = async (notifications) => {
  if (!notifications || !Array.isArray(notifications)) return { status: 204, route, action, result: [] }

  const updates = notifications.filter(item => item.target === 'settings')

  if (updates?.length) self.controller.refreshSettings()

  return { status: 200, route, action, result: updates }
}
