import {
  currentMonth,
  // availableServiceStatusHandler,
  pendingConnectionStatusHandler
} from '../data-handlers'

const route = 'statistics'

class StatisticsController {
  constructor () {
    this.statistics = {}
    this.pending = pendingConnectionStatusHandler() || ['Awaiting for connection', 'Awaiting for confirmation', 'In job queue']
  }

  setPending () {
    this.pending = pendingConnectionStatusHandler()
  }

  put (serviceId, name, monthlyCharge) {
    if (!this.statistics[serviceId]) this.statistics[serviceId] = { name, monthlyCharge, customers: {} }
    this.getStatistics()
    return this.statistics
  }

  patch (serviceId, customerId, status, modified) {
    if (!serviceId || !customerId || !status || !modified) return this.statistics
    this.statistics[serviceId].customers[customerId] = { status, modified }
    this.getStatistics()
    return this.statistics
  }

  filter (serviceId, status) {
    const { name, monthlyCharge, customers } = this.statistics[serviceId]
    const customersIds = Object.keys(customers).filter(key => customers[key].status === status)
    const lastMonth = customersIds.map(key => customers[key].modified).filter(ms => ms >= currentMonth[0] && ms <= currentMonth[1]).length
    return {
      name,
      monthlyCharge,
      totalSum: customersIds.length * monthlyCharge,
      totalNumber: customersIds.length,
      customers: customersIds,
      lastMonth,
      modificationDates: customersIds.map(key => customers[key].modified)
    }
  }

  getPending () {
    const response = []

    for (const serviceId in this.statistics) {
      const results = []
      for (const status of this.pending) {
        results.push(this.filter(serviceId, status))
      }
      response.push(results.reduce((accum, item) => Object.assign(accum, {
        name: item.name,
        monthlyCharge: item.monthlyCharge,
        totalSum: accum.totalSum + item.totalSum,
        totalNumber: accum.totalNumber + item.totalNumber,
        customers: accum.customers.concat(item.customers),
        lastMonth: accum.lastMonth + item.lastMonth,
        modificationDates: accum.modificationDates.concat(item.modificationDates)
      }), { totalSum: 0, totalNumber: 0, lastMonth: 0, customers: [], modificationDates: [] }))
    }

    return response
  }

  getActive () {
    const response = []

    for (const serviceId in this.statistics) {
      response.push(this.filter(serviceId, 'Active'))
    }

    return response
  }

  getNotConnected () {
    const response = []

    for (const serviceId in this.statistics) {
      response.push(this.filter(serviceId, 'Not connected'))
    }

    return response
  }

  clear () {
    this.statistics = {}
    return this.statistics
  }

  getStatistics () {
    self.postMessage({
      status: 200,
      route,
      action: 'get',
      data: {
        active: this.getActive(),
        pending: this.getPending(),
        notConnected: this.getNotConnected()
      }
    })
  }
}

export const statisticsController = new StatisticsController()
