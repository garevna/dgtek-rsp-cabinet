import { services } from './services'

export const getLastMonth = () => Object.keys(services)
  .reduce((number, serviceId) => number + services[serviceId].lastMonth, 0)
