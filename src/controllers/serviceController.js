const customerServiceProps = [
  'id',
  'status',
  'modified',
  'activationDate',
  'suspendDate',
  'suspendedDate',
  'resumeDate',
  'resumedDate',
  'cancelDate',
  'canceledDate',
  'lots',
  'log',
  'installation',
  'connectionData'
]

const defaultValues = {
  status: 'Not connected',
  modufied: Date.now(),
  lots: [],
  installation: {},
  log: { [Date.now()]: 'Not connected' }
}

class ServiceController {
  constructor () {
    this.services = null
    this.currentServiceIndex = undefined
    this.customerId = null
    this.customerAddress = ''
  }

  setCustomer (customerId, customerAddress, customerServices) {
    if (!customerId) return this.sendErrorMessage(this.customerError)
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
    this.services = []

    for (const service of customerServices) {
      const data = Object.assign({}, ...customerServiceProps.map(key => ({ [key]: service[key] || defaultValues[key] || null })))

      this.updateCancelation(service)
      this.updateSuspension(service)
      this.updateResuming(service)

      if (!data.id) {
        this.sendErrorMessage(this.serviceDetailsError)
        continue
      }
      this.services.push(data)
    }
  }

  updateCancelation (service) {
    if (service.status === 'Awaiting for cancelation') {
      if (service.canceledDate <= new Date().toISOString().slice(0, 10)) {
        window[Symbol.for('vue.instance')].__finishCancelation(this.customerId, service.id, service.canceledDate, this.getResponse)
      }
    }
  }

  updateSuspension (service) {
    if (service.status === 'Awaiting to be suspended') {
      if (service.suspendedDate <= new Date().toISOString().slice(0, 10)) {
        window[Symbol.for('vue.instance')].__finishSuspension(this.customerId, service.id, service.suspendedDate, this.getResponse)
      }
    }
  }

  updateResuming (service) {
    if (service.status === 'Awaiting to be resumed') {
      if (service.resumedDate <= new Date().toISOString().slice(0, 10)) {
        window[Symbol.for('vue.instance')].__finishResuming(this.customerId, service.id, service.resumedDate, this.getResponse)
      }
    }
  }

  getResponse (data) {
    // console.log('RESPONSE:\n', data)
  }

  getCustomerServices () {
    if (!this.customerId) return this.sendErrorMessage(this.customerError)
    if (!this.services) return this.sendErrorMessage(this.customerServicesError)

    return this.services.map(service => Object.assign({}, ...customerServiceProps.map(key => ({ [key]: service[key] }))))
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

    const details = Object.keys(this.services[index])
      .filter(key => !customerServiceProps.includes(key))
      .map(key => ({ [key]: this.services[index][key] }))

    return Object.assign({}, ...details)
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
    return this.getDataForServiceList()
  }

  updateCurrentServiceStatus (status, date) {
    if (!this.services || typeof this.currentServiceIndex !== 'number') return this.sendErrorMessage(this.customerServicesError)
    Object.assign(this.services[this.currentServiceIndex], {
      status,
      log: Object.assign(this.services[this.currentServiceIndex].log || {}, { [Date.now()]: status })
    })

    return this.getDataForServiceList()
  }

  removeCurrentService () {
    if (!this.services || typeof this.currentServiceIndex !== 'number') return this.sendErrorMessage(this.customerServicesError)
    this.services.splice(this.currentServiceIndex, 1)
    this.currentServiceIndex = undefined

    return this.getDataForServiceList()
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

    const props = customerServiceProps.concat(['serviceName'])

    return this.services
      .map(service => Object.assign({}, ...props.map(key => ({ [key]: service[key] || defaultValues[key] || null }))))
  }

  addNewService (serviceDetails) {
    if (!serviceDetails) return this.sendErrorMessage(this.illegalMethodCall, 'addNewService')
    if (!this.customerId) return this.sendErrorMessage(this.customerError)
    if (!this.services) this.services = []

    const { _id: id, ...details } = serviceDetails

    const schema = Object.assign({}, ...customerServiceProps.map(key => ({ [key]: null })))

    this.services.push(Object.assign(schema, {
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
