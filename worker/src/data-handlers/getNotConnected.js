import { services } from './services'

export const getNotConnected = () => Object.keys(services)
  .reduce((number, serviceId) => number + services[serviceId].notConnected, 0)
