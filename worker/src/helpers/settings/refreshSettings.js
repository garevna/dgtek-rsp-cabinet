import { get } from '../AJAX'

import {
  estimatedServiceDeliveryTimeHandler,
  ticketCategoriesHandler,
  scheduleCalendarSettingsHandler,
  availableServiceStatusHandler,
  pendingConnectionStatusHandler
} from '../../data-handlers'

const { statisticsController } = require('../../controllers')

const { refreshSettingsError } = require('../error-handlers').default

const [route, action] = ['settings', 'refresh']

export const refreshSettings = async function () {
  const { status, result } = await get('settings')

  if (status !== 200) return refreshSettingsError(status)

  const { estimatedServiceDeliveryTime, ticketCategories, schedule, availableServiceStatus, pendingConnectionStatus } = result

  estimatedServiceDeliveryTimeHandler(estimatedServiceDeliveryTime)
  ticketCategoriesHandler(ticketCategories)
  scheduleCalendarSettingsHandler(schedule)
  availableServiceStatusHandler(availableServiceStatus)
  pendingConnectionStatusHandler(pendingConnectionStatus.partner)

  statisticsController.setPending()

  return {
    status,
    route,
    action,
    result: {
      estimatedServiceDeliveryTime,
      ticketCategories,
      scheduleCalendarSettings: schedule,
      availableServiceStatus,
      pendingConnectionStatus: pendingConnectionStatus.partner
    }
  }
}
