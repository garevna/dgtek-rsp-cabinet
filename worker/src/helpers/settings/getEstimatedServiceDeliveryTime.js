import { estimatedServiceDeliveryTimeHandler } from '../../data-handlers'

const [route, action, section] = ['settings', 'get', 'estimatedServiceDeliveryTime']

export const getEstimatedServiceDeliveryTime = (key) => {
  const data = estimatedServiceDeliveryTimeHandler()
  if (!key) return { status: 200, route, action, result: data }
  if (data[key]) return { status: 200, route, action, key, result: data[key] }
  for (const propName in data) {
    if (data[propName].synonyms.includes(key)) {
      return {
        status: 200,
        route,
        action,
        section,
        key,
        result: {
          statusToDisplay: data[propName].toDisplay,
          estimatedServiceDeliveryTime: data[propName].value,
          eventType: data[propName].event,
          newCustomerDisabled: data[propName].newCustomerDisabled
        }
      }
    }
  }

  return {
    status: 404,
    route,
    action,
    section,
    key,
    result: null,
    error: true,
    errorType: 'Invalid building status value',
    errorMessage: `Building status ${key} is invalid`
  }
}
