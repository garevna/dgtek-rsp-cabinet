import { secretHandler, hostHandler, apiKeyHandler, adminKeyHandler, adminCredHandler } from '../env'

export const init = (data) => {
  if (self.initialized) return
  const [route, action] = ['crypto', 'init']
  if (!data.host || !data.key || !data.secret || !data.adminKey || !data.adminCred) {
    return {
      status: 422,
      route,
      action,
      error: true,
      errorType: 'Init application',
      result: 'Invalid init request: Insufficient data to start the app'
    }
  }
  secretHandler(data.secret)
  hostHandler(data.host)
  apiKeyHandler(data.key)
  adminKeyHandler(data.adminKey)
  adminCredHandler(data.adminCred)

  self.initialized = true
  return {
    status: 200,
    route,
    action
    // result: { secret: secretHandler(), host: hostHandler(), apiKey: apiKeyHandler(), admin: [adminKeyHandler(), adminCredHandler()] }
  }
}
