class StatisticsController {
  constructor () {
    this.totalNumberOfActiveCustomers = 0
    this.totalNumberOfPendingConnections = 0
    this.totalNumberOfNotConnectedCustomers = 0
    this.totalCurrentMonthlyCharge = 0
    this.totalMonthlyChargeIncludingPendingConnections = 0
    this.numberOfConnectedCustomersForTheLastMonth = 0
    this.active = []
    this.pending = []
    this.notConnected = []
  }

  catchUpdates (statistics) {
    console.log('STATISTICS:\n', statistics)
    const { active, pending, notConnected } = statistics.data
    this.active = active.filter(item => item.totalNumber)
    this.pending = pending.filter(item => item.totalNumber)
    this.notConnected = notConnected.filter(item => item.totalNumber)

    this.totalNumberOfActiveCustomers = active.reduce((accum, item) => accum + item.totalNumber, 0)
    this.totalNumberOfPendingConnections = pending.reduce((accum, item) => accum + item.totalNumber, 0)
    this.totalNumberOfNotConnectedCustomers = notConnected.reduce((accum, item) => accum + item.totalNumber, 0)

    this.numberOfConnectedCustomersForTheLastMonth = active.reduce((accum, item) => accum + item.lastMonth, 0)

    this.totalCurrentMonthlyCharge = active.reduce((accum, item) => accum + item.totalSum, 0)
    this.totalMonthlyChargeIncludingPendingConnections = this.totalCurrentMonthlyCharge + pending.reduce((accum, item) => accum + item.totalSum, 0)

    window[Symbol.for('vue.instance')].$emit('statistics-updated')
  }

  getServiceInfo (serviceName) {
    if (!serviceName || typeof serviceName !== 'string') return null

    return {
      active: this.active.filter(item => item.name === serviceName).reduce((result, item) => result + item.totalNumber, 0),
      pending: this.pending.filter(item => item.name === serviceName).reduce((result, item) => result + item.totalNumber, 0)
    }
  }
}

export const statisticsController = new StatisticsController()
