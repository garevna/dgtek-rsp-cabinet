import { init, hash, encrypt, decrypt } from './crypto'

import rsp from './rsp'
import customers from './customers'
import tickets from './tickets'
import services from './services'

import { getWeekNumber } from 'garevna-date-functions'

self.getWeekNumber = getWeekNumber

export const controller = Object.assign({}, rsp, customers, tickets, services)

// self.postMessage({ status: 300, controller: Object.keys(controller) })

export {
  init,
  hash,
  encrypt,
  decrypt
}
