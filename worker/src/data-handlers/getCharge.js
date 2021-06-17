import { services } from './services'

export const getCharge = (status) => Object.keys(services)
  .reduce((charge, serviceId) => charge + services[serviceId][status] * services[serviceId].charge, 0)
