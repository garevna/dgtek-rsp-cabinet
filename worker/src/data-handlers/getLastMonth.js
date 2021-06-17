import { services } from './services'

export const getLastMonth = (status) => Object.keys(services)
  .reduce((number, serviceId) => number + services[serviceId].lastMonth, 0)
