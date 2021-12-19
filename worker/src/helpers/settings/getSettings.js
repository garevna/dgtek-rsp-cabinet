import { getEstimatedServiceDeliveryTime } from './getEstimatedServiceDeliveryTime'
import {
  ticketCategoriesHandler,
  scheduleCalendarSettingsHandler,
  availableServiceStatusHandler,
  pendingConnectionStatusHandler
} from '../../data-handlers'

const [route, action] = ['settings', 'get']

const handlers = {
  ticketCategories: ticketCategoriesHandler,
  scheduleCalendarSettings: scheduleCalendarSettingsHandler,
  availableServiceStatus: availableServiceStatusHandler,
  pendingConnectionStatus: pendingConnectionStatusHandler
}

export const getSettings = (section, key) => {
  if (section === 'estimatedServiceDeliveryTime') return getEstimatedServiceDeliveryTime(key)

  if (Object.keys(handlers).includes(section)) return { status: 200, route, action, section, result: handlers[section]() }

  return {
    status: 422,
    route,
    action,
    section,
    error: true,
    errorType: 'Invalid request',
    errorMessage: `Requst for ${section} is ivalid`
  }
}
