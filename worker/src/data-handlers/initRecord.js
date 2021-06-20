import { services } from './services'

export const initRecord = (serviceId) => {
  services[serviceId] = {
    serviceName: '',
    charge: 0,
    active: 0,
    pending: 0,
    lastMonth: 0,
    notConnected: 0
  }
}
