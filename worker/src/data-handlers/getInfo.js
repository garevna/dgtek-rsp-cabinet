import { services } from './services'
import { getCharge } from './getCharge'
import { getConnectionsNumber } from './getConnectionsNumber'
import { getLastMonth } from './getLastMonth'
import { getNotConnected } from './getNotConnected'

export const getInfo = () => ({
  charge: getCharge('active'),
  chargeWithPending: getCharge('active') + getCharge('pending'),
  activeConnectionsNumber: getConnectionsNumber('active'),
  connectedLastMonth: getLastMonth('active'),
  notConnected: getNotConnected(),
  services
})
