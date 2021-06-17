import { servicesInfoHandler } from '../../data-handlers'

export const calculations = async (customers) => {
  for (const customer of customers) {
    if (!customer.services || !Array.isArray(customer.services)) continue

    for (const service of customer.services) {
      servicesInfoHandler('add-service', service.id, { status: service.status, modified: service.modified })
    }
  }
}
