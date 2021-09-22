import { getEstimatedServiceDeliveryTime } from './getEstimatedServiceDeliveryTime'
import { ticketCategoriesHandler } from '../../data-handlers'

const [route, action] = ['settings', 'get']

export const getSettings = (section, key) => {
  if (section === 'estimatedServiceDeliveryTime') return getEstimatedServiceDeliveryTime(key)
  if (section === 'ticketCategories') return { status: 200, route, action, result: ticketCategoriesHandler() }
  return {
    status: 422,
    route,
    action,
    data: null,
    error: true,
    errorType: 'Invalid request',
    errorMessage: `Requst for ${section} is ivalid`
  }
}
