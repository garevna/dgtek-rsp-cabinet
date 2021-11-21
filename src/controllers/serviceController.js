class ServiceController {
  constructor () {
    this.services = null
    this.currentServiceIndex = undefined
    this.customerId = null
    this.customerAddress = ''
  }

  setCustomer (customerId, customerAddress, customerServices) {
    this.customerId = customerId
    this.customerAddress = customerAddress

    this.setCustomerServices(customerServices)
    this.currentServiceIndex = undefined
  }

  getCustomerAddress () {
    return this.customerAddress
  }

  getCustomerId () {
    return this.customerId
  }

  setCustomerServices (customerServices) {
    if (!this.customerId) return this.sendErrorMessage(this.customerError)

    this.services = []

    for (const service of customerServices) {
      const { id, status, modified, lots = [], log = {}, installation = {} } = service
      if (!id) {
        this.sendErrorMessage(this.serviceDetailsError)
        continue
      }
      this.services.push({ id, status, modified, lots, log, installation })
    }
  }

  getCustomerServices () {
    if (!this.customerId) return this.sendErrorMessage(this.customerError)
    if (!this.services) return this.sendErrorMessage(this.customerServicesError)

    return this.services.map(service => ({
      id: service.id,
      status: service.status,
      modified: service.modified,
      lots: service.lots,
      log: service.log,
      installation: service.installation
    }))
  }

  setServiceDetails (serviceDetails) {
    if (!this.services) return this.sendErrorMessage(this.customerServicesError)
    if (!serviceDetails) return this.sendErrorMessage(this.illegalMethodCall, 'setServiceDetails')

    const { _id, ...details } = serviceDetails

    const index = this.services.findIndex(service => service.id === _id)

    if (index === -1) return this.sendErrorMessage(this.serviceNotFound)

    Object.assign(this.services[index], details)
  }

  getServiceDetails (serviceId) {
    if (!serviceId) return this.sendErrorMessage(this.illegalMethodCall, 'getServiceDetails')

    const index = this.services.findIndex(service => service.id === serviceId)

    if (index === -1) return this.sendErrorMessage(this.serviceNotFound)

    const { id, status, modified, lots, log, installation, ...details } = this.services[index]

    return details
  }

  setCurrentService (serviceId) {
    if (!this.services) return this.sendErrorMessage(this.customerServicesError)

    this.currentServiceIndex = this.services.findIndex(service => service.id === serviceId)
  }

  getCurrentService () {
    return !this.services || typeof this.currentServiceIndex !== 'number'
      ? this.sendErrorMessage(this.customerServicesError)
      : this.services[this.currentServiceIndex]
  }

  updateCurrentService (data) {
    Object.assign(this.services[this.currentServiceIndex], data)
  }

  getServiceDetailsForCustomersList () {
    if (!this.services) return null
    const { id: serviceId, serviceName, status, subscriptionFee: servicePlan, upstreamSpeed, downstreamSpeed, contractTerm: serviceTerm } = this.services[0]
    return {
      serviceId,
      serviceName,
      serviceSpeed: `${upstreamSpeed}/${downstreamSpeed}`,
      serviceStatus: status,
      servicePlan,
      serviceTerm
    }
  }

  getDataForServiceList () {
    if (!this.services) return this.sendErrorMessage(this.customerServicesError)

    return this.services.map(service => {
      const {
        id,
        serviceName,
        status = 'Not connected',
        modified = Date.now(),
        lots = [],
        log = { [Date.now()]: 'Not connected' },
        installation = {}
      } = service

      return { id, serviceName, status, modified, log, lots, installation }
    })
  }

  addNewService (serviceDetails) {
    if (!serviceDetails) return this.sendErrorMessage(this.illegalMethodCall, 'addNewService')
    if (!this.customerId) return this.sendErrorMessage(this.customerError)
    if (!this.services) this.services = []

    const { _id: id, ...details } = serviceDetails

    this.services.push(Object.assign({
      id,
      status: 'Not connected',
      modified: Date.now(),
      lots: [],
      log: { [Date.now()]: 'Not connected' },
      installation: {}
    }, details))
  }

  sendErrorMessage (errorMessage, param) {
    window[Symbol.for('vue.instance')].$emit('open-error-popup', {
      errorType: `Customer services controller: ${param || ''}`,
      errorMessage
    })
  }
}

Object.assign(ServiceController.prototype, {
  customerError: 'Customer is not defined',
  serviceDetailsError: 'Illegal customer service: service id is not defined',
  serviceNotFound: 'Service not found',
  statusNotDefined: 'Service status not defined',
  customerServicesError: 'Illegal value of customer services',
  illegalMethodCall: 'Method invocation incorrect. Perhaps you need to send arguments.'
})

export const serviceController = new ServiceController()
