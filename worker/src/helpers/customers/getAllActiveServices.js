import { openDB } from '../db/openDB'

export const getAllActiveServices = async () => {
  const [route, action] = ['customers', 'info']
  const { status, result: db } = await openDB()
  if (status !== 200) {
    return {
      status,
      route,
      action,
      error: true,
      errorType: 'Customers',
      errorMessage: 'Error opening the local DB'
    }
  }

  const result = {
    activeCustomersNumber: 0,
    newCustomersLastMonth: 0,
    activeCustomers: [],
    activeServicesNumber: 0,
    pendingConnectionsNumber: 0,
    activeServices: {},
    pendingConnections: {},
    totalMonthlyCharge: 0,
    totalMonthlyChargeForPendingConnections: 0
  }

  const response = await self.controller.getListOfServices()
  if (response.status !== 200) return response
  const services = response.result

  const store = db.transaction('customers', 'readwrite').objectStore('customers')

  const month = [
    Date.parse(new Date(new Date().getFullYear(), new Date().getMonth(), 1)),
    Date.parse(new Date(new Date().getFullYear(), new Date().getMonth(), 31))
  ]

  return new Promise((resolve) => {
    store.openCursor().onsuccess = async (event) => {
      const cursor = event.target.result
      if (cursor) {
        const customer = cursor.value
        const active = Array.isArray(customer.services) ? customer.services.filter(service => service.status === 'Active') : []
        const pending = Array.isArray(customer.services) ? customer.services.filter(service => service.status === 'In job queue') : []

        result.newCustomersLastMonth += active.filter(service => service.modified > month[0] && service.modified < month[1]).length
        if (active.length > 0) {
          result.activeCustomersNumber += 1
          result.activeCustomers.push({
            uniqueCode: customer.uniqueCode,
            address: `${customer.apartmentNumber}/${customer.address}`
          })
        }
        result.activeServicesNumber += active.length
        result.pendingConnectionsNumber += pending.length

        active.forEach((service) => {
          const currentService = services.find(item => item._id === service.id)
          result.totalMonthlyCharge += currentService.subscriptionFee
          if (typeof result.activeServices[currentService.serviceName] !== 'number') result.activeServices[currentService.serviceName] = 0
          result.activeServices[currentService.serviceName] += 1
        })

        pending.forEach((service) => {
          const currentService = services.find(item => item._id === service.id)
          result.totalMonthlyChargeForPendingConnections += currentService.subscriptionFee
          if (typeof result.pendingConnections[currentService.serviceName] !== 'number') result.pendingConnections[currentService.serviceName] = 0
          result.pendingConnections[currentService.serviceName] += 1
        })

        cursor.continue()
      } else resolve({ status: 200, route, action, result })
    }
  })
}
