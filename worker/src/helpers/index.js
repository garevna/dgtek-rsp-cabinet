import { init, hash, encrypt, decrypt } from './crypto'

import rsp from './rsp'
import customers from './customers'
import tickets from './tickets'
import services from './services'

import schedule from './schedule'

import settings from './settings'

import dashboard from './dashboard'

import updates from './updates'

import { getWeekNumber } from 'garevna-date-functions'

self.postDebugMessage = function (message) {
  self.postMessage(Object.assign(message, { status: 300 }))
}

self.getWeekNumber = getWeekNumber

export const controller = Object.assign({}, rsp, customers, tickets, services, schedule, settings, dashboard, updates)

export {
  init,
  hash,
  encrypt,
  decrypt
}
