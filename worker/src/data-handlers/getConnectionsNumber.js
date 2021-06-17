import { services } from './services'

export const getConnectionsNumber = (status) => Object.keys(services)
  .reduce((number, serviceId) => number + services[serviceId][status], 0)
