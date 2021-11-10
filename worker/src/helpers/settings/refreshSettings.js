import { get } from '../AJAX'

import {
  estimatedServiceDeliveryTimeHandler,
  ticketCategoriesHandler,
  scheduleCalendarSettingsHandler
} from '../../data-handlers'

const { refreshSettingsError } = require('../error-handlers').default

const [route, action] = ['settings', 'refresh']

export const refreshSettings = async function () {
  const { status, result } = await get('settings')

  if (status !== 200) return refreshSettingsError(status)

  const { estimatedServiceDeliveryTime, ticketCategories, schedule } = result

  estimatedServiceDeliveryTimeHandler(estimatedServiceDeliveryTime)
  ticketCategoriesHandler(ticketCategories)
  scheduleCalendarSettingsHandler(schedule)

  return {
    status,
    route,
    action,
    result: {
      estimatedServiceDeliveryTime,
      ticketCategories,
      scheduleCalendarSettings: schedule
    }
  }
}
